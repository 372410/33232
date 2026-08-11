/**
 * 智涂云MES系统 - 应用逻辑
 * 路由系统 + 页面渲染 + 交互逻辑
 * 基于实际MES系统(http://125.122.18.184:9000/)重建
 */

// 当前状态
let currentPage = 'dashboard-overview';
let expandedMenus = new Set(['dashboard']); // 默认展开的菜单

// ============ 初始化 ============
function init() {
    renderSidebar();
    navigateTo('dashboard-overview', '数据概览');
}

// ============ 侧边栏导航 ============
function renderSidebar() {
    const nav = document.getElementById('sidebarNav');
    nav.innerHTML = MENU.map(item => {
        if (item.children) {
            const isExpanded = expandedMenus.has(item.id);
            const hasActiveChild = item.children.some(c => c.page === currentPage);
            if (hasActiveChild) expandedMenus.add(item.id);
            return `
                <div class="menu-group">
                    <div class="menu-item ${isExpanded ? 'expanded' : ''}" onclick="toggleMenu('${item.id}')">
                        <span class="menu-icon">${item.icon}</span>
                        <span class="menu-label">${item.label}</span>
                        <span class="menu-arrow">▶</span>
                    </div>
                    <div class="menu-sub ${isExpanded ? 'expanded' : ''}" id="sub-${item.id}">
                        ${item.children.map(child => `
                            <div class="sub-item ${child.page === currentPage ? 'active' : ''}" onclick="navigateTo('${child.page}', '${child.label}')">
                                ${child.label}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="menu-item ${item.page === currentPage ? 'active' : ''}" onclick="navigateTo('${item.page}', '${item.label}')">
                    <span class="menu-icon">${item.icon}</span>
                    <span class="menu-label">${item.label}</span>
                </div>
            `;
        }
    }).join('');
}

function toggleMenu(menuId) {
    if (expandedMenus.has(menuId)) {
        expandedMenus.delete(menuId);
    } else {
        expandedMenus.add(menuId);
    }
    renderSidebar();
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
}

// ============ 路由导航 ============
function navigateTo(pageId, label) {
    currentPage = pageId;
    const config = PAGE_CONFIG[pageId];

    // 更新页面标题
    const titleEl = document.getElementById('pageTitle');
    if (label) {
        titleEl.textContent = label;
    } else if (config && config.title) {
        titleEl.textContent = config.title;
    }

    // 更新导航高亮
    renderSidebar();

    // 渲染内容
    const content = document.getElementById('content');
    if (config && config.type === 'dashboard') {
        content.innerHTML = renderDashboard();
    } else if (config && config.type === 'custom' && config.render === 'renderWorkBench') {
        content.innerHTML = renderWorkBench();
    } else if (config) {
        content.innerHTML = renderTablePage(config);
    } else {
        content.innerHTML = '<div class="card"><div class="card-body"><p>页面建设中...</p></div></div>';
    }

    // 滚动到顶部
    content.scrollTop = 0;
}

// ============ 首页看板渲染 ============
function renderDashboard() {
    const d = DASHBOARD_DATA;
    return `
        <!-- 统计卡片 -->
        <div class="stats-grid">
            ${d.stats.map(s => `
                <div class="stat-card" style="border-left:4px solid ${s.color};">
                    <div class="stat-icon" style="background:${s.color}15;color:${s.color};">${s.icon}</div>
                    <div>
                        <div class="stat-value" style="color:${s.color};">${s.value}</div>
                        <div class="stat-label">${s.label}</div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- 图表区域 -->
        <div class="dashboard-charts">
            <!-- 近7日完工数量趋势 -->
            <div class="card chart-card">
                <div class="card-header">
                    <span class="card-title">近7日完工数量趋势</span>
                </div>
                <div class="card-body">
                    <div class="chart-bar-container">
                        ${d.weeklyChart.map(item => {
                            const max = Math.max(...d.weeklyChart.map(w => w.value));
                            const h = (item.value / max * 180);
                            return `<div class="chart-bar-wrapper">
                                <span class="chart-bar-value">${item.value}</span>
                                <div class="chart-bar" style="height:${h}px;background:linear-gradient(180deg, #1890ff, #096dd9);"></div>
                                <span class="chart-bar-label">${item.day}</span>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            </div>

            <!-- 不良原因统计 -->
            <div class="card chart-card">
                <div class="card-header">
                    <span class="card-title">不良原因统计</span>
                </div>
                <div class="card-body">
                    <div class="defect-list">
                        ${d.defectReasons.map(dr => `
                            <div class="defect-item">
                                <span class="defect-name">${dr.name}</span>
                                <div class="progress-bar" style="flex:1;margin:0 12px;">
                                    <div class="progress-fill ${dr.percentage >= 30 ? 'red' : dr.percentage >= 15 ? 'orange' : 'blue'}" style="width:${dr.percentage * 2}%;"></div>
                                </div>
                                <span class="defect-count">${dr.count}件 (${dr.percentage}%)</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>

        <!-- 订单到期情况 + 完成订单数量 -->
        <div class="dashboard-charts">
            <div class="card chart-card">
                <div class="card-header">
                    <span class="card-title">订单到期情况</span>
                </div>
                <div class="table-wrapper" style="box-shadow:none;border-radius:0;">
                    <table>
                        <thead><tr><th>订单编号</th><th>产品</th><th>剩余天数</th><th>状态</th></tr></thead>
                        <tbody>
                            ${d.orderExpiry.map(o => `
                                <tr>
                                    <td>${o.orderNo}</td>
                                    <td>${o.product}</td>
                                    <td>${o.daysLeft}天</td>
                                    <td><span class="tag ${o.status === '紧急' ? 'tag-danger' : 'tag-success'}">${o.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card chart-card">
                <div class="card-header">
                    <span class="card-title">完成订单数量统计</span>
                </div>
                <div class="card-body" style="display:flex;align-items:center;justify-content:center;gap:40px;">
                    <div style="text-align:center;">
                        <div style="font-size:48px;font-weight:700;color:#52c41a;">25</div>
                        <div style="color:#909399;font-size:13px;">本月已完成</div>
                    </div>
                    <div style="width:1px;height:60px;background:#e4e7ed;"></div>
                    <div style="text-align:center;">
                        <div style="font-size:48px;font-weight:700;color:#1890ff;">28</div>
                        <div style="color:#909399;font-size:13px;">本月总数</div>
                    </div>
                    <div style="width:1px;height:60px;background:#e4e7ed;"></div>
                    <div style="text-align:center;">
                        <div style="font-size:48px;font-weight:700;color:#faad14;">89.3%</div>
                        <div style="color:#909399;font-size:13px;">完成率</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 今日报工明细 -->
        <div class="card">
            <div class="card-header">
                <span class="card-title">今日报工明细</span>
            </div>
            <div class="table-wrapper" style="box-shadow:none;border-radius:0;">
                <table>
                    <thead><tr><th>报工人员</th><th>工序</th><th>产品</th><th>完成数量</th><th>不良品</th><th>报工时间</th></tr></thead>
                    <tbody>
                        ${d.todayReports.map(r => `
                            <tr>
                                <td>${r.reporter}</td>
                                <td>${r.process}</td>
                                <td>${r.product}</td>
                                <td>${r.qty}</td>
                                <td>${r.defectQty > 0 ? `<span style="color:#ff4d4f;">${r.defectQty}</span>` : '0'}</td>
                                <td>${r.time}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ============ 报工工作台 ============
function renderWorkBench() {
    return `
        <div class="work-bench">
            <!-- 当前任务卡片 -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">当前生产任务</span>
                    <button class="btn btn-primary btn-sm" onclick="alert('请扫描工单二维码或手动输入工单号')">扫描工单</button>
                </div>
                <div class="card-body">
                    <div class="wb-task-info">
                        <div class="wb-task-item">
                            <span class="wb-label">工单编号：</span>
                            <span class="wb-value">MO202601010001</span>
                        </div>
                        <div class="wb-task-item">
                            <span class="wb-label">产品名称：</span>
                            <span class="wb-value">汽车前保险杠</span>
                        </div>
                        <div class="wb-task-item">
                            <span class="wb-label">当前工序：</span>
                            <span class="wb-value">前处理</span>
                        </div>
                        <div class="wb-task-item">
                            <span class="wb-label">任务数量：</span>
                            <span class="wb-value">500件</span>
                        </div>
                        <div class="wb-task-item">
                            <span class="wb-label">已完成：</span>
                            <span class="wb-value" style="color:#52c41a;font-weight:700;">320件</span>
                        </div>
                        <div class="wb-task-item">
                            <span class="wb-label">不良品：</span>
                            <span class="wb-value" style="color:#ff4d4f;font-weight:700;">3件</span>
                        </div>
                    </div>
                    <div style="margin-top:16px;">
                        <div class="progress-bar" style="height:20px;">
                            <div class="progress-fill blue" style="width:64%;line-height:20px;text-align:center;color:#fff;">64%</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 报工操作 -->
            <div class="card" style="margin-top:16px;">
                <div class="card-header">
                    <span class="card-title">报工操作</span>
                </div>
                <div class="card-body">
                    <div class="form-row" style="gap:20px;">
                        <div class="form-item">
                            <label><span class="required">*</span>完成数量</label>
                            <input type="number" class="form-input" placeholder="请输入完成数量" id="reportQty" />
                        </div>
                        <div class="form-item">
                            <label>不良品数量</label>
                            <input type="number" class="form-input" placeholder="请输入不良品数量" id="defectQty" />
                        </div>
                    </div>
                    <div class="form-row" style="gap:20px;">
                        <div class="form-item" style="width:100%;">
                            <label>不良品原因</label>
                            <select class="form-select" id="defectReason">
                                <option value="">请选择不良品原因</option>
                                <option value="表面划伤">表面划伤</option>
                                <option value="色差">色差</option>
                                <option value="厚度不足">厚度不足</option>
                                <option value="流挂">流挂</option>
                                <option value="其他">其他</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row" style="gap:20px;">
                        <div class="form-item" style="width:100%;">
                            <label>备注</label>
                            <textarea class="form-textarea" placeholder="请输入备注信息" id="reportRemark"></textarea>
                        </div>
                    </div>
                    <div style="margin-top:16px;text-align:right;">
                        <button class="btn btn-primary" onclick="submitWorkReport()">提交报工</button>
                    </div>
                </div>
            </div>

            <!-- 今日报工记录 -->
            <div class="card" style="margin-top:16px;">
                <div class="card-header">
                    <span class="card-title">今日报工记录</span>
                </div>
                <div class="table-wrapper" style="box-shadow:none;border-radius:0;">
                    <table>
                        <thead><tr><th>报工时间</th><th>工序</th><th>产品</th><th>完成数量</th><th>不良品</th><th>状态</th></tr></thead>
                        <tbody>
                            <tr><td>17:00</td><td>前处理</td><td>汽车前保险杠</td><td>320</td><td>3</td><td><span class="tag tag-success">已提交</span></td></tr>
                            <tr><td>14:30</td><td>前处理</td><td>汽车前保险杠</td><td>150</td><td>1</td><td><span class="tag tag-success">已提交</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function submitWorkReport() {
    const qty = document.getElementById('reportQty').value;
    if (!qty) {
        alert('请输入完成数量');
        return;
    }
    alert('报工提交成功！\n完成数量：' + qty + '件');
    navigateTo('work-bench', '报工工作台');
}

// ============ 表格页面渲染 ============
function renderTablePage(config) {
    let html = '';

    // 搜索栏
    if (config.search && config.search.length > 0) {
        html += `<div class="search-bar">`;
        config.search.forEach(s => {
            html += `<div class="search-item">`;
            html += `<span class="search-label">${s.label}</span>`;
            if (s.type === 'select') {
                html += `<select class="search-select" id="search-${s.name}">`;
                s.options.forEach(opt => {
                    html += `<option value="${opt}">${opt}</option>`;
                });
                html += `</select>`;
            } else {
                html += `<input type="text" class="search-input" id="search-${s.name}" placeholder="${s.placeholder || '请输入'}" />`;
            }
            html += `</div>`;
        });
        // 如果按钮中已有搜索/重置，则不在这里加
        const hasSearchBtn = config.buttons && config.buttons.some(b => b.action === 'search' || b.action === 'reset');
        if (!hasSearchBtn) {
            html += `<div class="search-item"><button class="btn btn-primary" onclick="handleSearch()">查询</button></div>`;
            html += `<div class="search-item"><button class="btn" onclick="handleReset()">重置</button></div>`;
        }
        html += `</div>`;
    }

    // 按钮工具栏
    if (config.buttons && config.buttons.length > 0) {
        html += `<div class="toolbar">`;
        config.buttons.forEach(btn => {
            const cls = btn.type === 'primary' ? 'btn-primary' : btn.type === 'danger' ? 'btn-danger' : btn.type === 'success' ? 'btn-success' : '';
            html += `<button class="btn ${cls}" onclick="handleButton('${btn.action}', '${config.title}')">${btn.text}</button>`;
        });
        html += `</div>`;
    }

    // 表格
    html += `<div class="table-wrapper"><table><thead><tr>`;
    config.columns.forEach(col => {
        html += `<th${col.width ? ` style="min-width:${col.width}px"` : ''}>${col.label}</th>`;
    });
    html += `</tr></thead><tbody id="tableBody">`;

    if (config.data && config.data.length > 0) {
        config.data.forEach((row, idx) => {
            html += `<tr>`;
            config.columns.forEach(col => {
                html += `<td>${renderCell(row, col, idx)}</td>`;
            });
            html += `</tr>`;
        });
    } else {
        const colCount = config.columns.length;
        html += `<tr><td colspan="${colCount}" class="table-empty">暂无数据</td></tr>`;
    }

    html += `</tbody></table>`;

    // 分页
    if (config.data && config.data.length > 0) {
        html += renderPagination(config.data.length);
    }

    html += `</div>`;
    return html;
}

function renderCell(row, col, idx) {
    if (col.key === 'checkbox') {
        return `<input type="checkbox" class="checkbox" />`;
    }
    if (col.key === 'action') {
        return `<button class="btn-text-link" onclick="handleEdit(${idx})">编辑</button>
                <button class="btn-text-link" onclick="handleView(${idx})">查看</button>
                <button class="btn-text-link danger" onclick="handleDelete(${idx})">删除</button>`;
    }
    let value = row[col.key] !== undefined ? row[col.key] : '';

    if (col.type === 'tag') {
        const tagClass = getTagClass(value);
        return `<span class="tag ${tagClass}">${value}</span>`;
    }
    if (col.type === 'progress') {
        const pct = parseFloat(value);
        const cls = pct >= 99 ? 'green' : pct >= 95 ? 'blue' : pct >= 90 ? 'orange' : 'red';
        return `<div style="display:flex;align-items:center;gap:8px;">
            <div class="progress-bar" style="flex:1;"><div class="progress-fill ${cls}" style="width:${pct}%"></div></div>
            <span>${value}%</span>
        </div>`;
    }
    return value;
}

function getTagClass(value) {
    const map = {
        '生产中': 'tag-info', '执行中': 'tag-info', '运行中': 'tag-success', '检验中': 'tag-info', '已排产': 'tag-info', '维修中': 'tag-info',
        '已完成': 'tag-success', '已合格': 'tag-success', '合格': 'tag-success', '正常': 'tag-success', '成功': 'tag-success', '启用': 'tag-success', '充足': 'tag-success', '已读': 'tag-default',
        '待排产': 'tag-default', '待执行': 'tag-default', '待检验': 'tag-default', '待维修': 'tag-default', '备用': 'tag-default', '未读': 'tag-warning',
        '已取消': 'tag-danger', '已不合格': 'tag-danger', '不合格': 'tag-danger', '紧急': 'tag-danger', '禁用': 'tag-danger',
        '已逾期': 'tag-danger', '已暂停': 'tag-warning',
        '预警': 'tag-warning', '停机': 'tag-warning',
        '系统通知': 'tag-info', '生产提醒': 'tag-warning', '设备告警': 'tag-danger', '质检通知': 'tag-success',
    };
    return map[value] || 'tag-default';
}

function renderPagination(total) {
    return `
        <div class="pagination">
            <span class="pagination-info">共 ${total} 条</span>
            <button class="page-btn" disabled>‹</button>
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">3</button>
            <button class="page-btn">›</button>
            <select class="search-select" style="min-width:80px;">
                <option>10条/页</option>
                <option>20条/页</option>
                <option>50条/页</option>
            </select>
        </div>
    `;
}

// ============ 交互处理 ============
function handleSearch() {
    const rows = document.querySelectorAll('#tableBody tr');
    rows.forEach(r => r.style.opacity = '0.5');
    setTimeout(() => {
        rows.forEach(r => r.style.opacity = '1');
    }, 300);
}

function handleReset() {
    document.querySelectorAll('.search-input, .search-select').forEach(el => {
        if (el.tagName === 'SELECT') el.selectedIndex = 0;
        else el.value = '';
    });
}

function handleButton(action, title) {
    if (action === 'add') {
        const formConfig = FORM_CONFIG[currentPage];
        if (formConfig) {
            showAddModal(formConfig);
        } else {
            alert(`新增${title}功能`);
        }
    } else if (action === 'export') {
        alert(`正在导出${title}数据...`);
    } else if (action === 'refresh') {
        navigateTo(currentPage);
    } else if (action === 'import') {
        alert('请选择要导入的文件');
    } else if (action === 'batchDelete') {
        if (confirm('确认删除选中数据？')) {
            alert('删除成功');
        }
    } else if (action === 'search') {
        handleSearch();
    } else if (action === 'reset') {
        handleReset();
    } else if (action === 'markRead') {
        alert('已标记为已读');
    }
}

function handleEdit(idx) {
    const formConfig = FORM_CONFIG[currentPage];
    if (formConfig) {
        showAddModal(formConfig, idx);
    } else {
        alert('编辑功能');
    }
}

function handleView(idx) {
    alert('查看详情');
}

function handleDelete(idx) {
    if (confirm('确认删除该条数据？')) {
        const rows = document.querySelectorAll('#tableBody tr');
        if (rows[idx]) {
            rows[idx].style.opacity = '0';
            setTimeout(() => {
                if (rows[idx]) rows[idx].remove();
            }, 300);
        }
    }
}

// ============ 弹窗 ============
function showAddModal(formConfig, editIdx) {
    const isEdit = editIdx !== undefined;
    const title = isEdit ? `编辑${formConfig.title.replace('新增', '').replace('添加', '')}` : formConfig.title;

    let fieldsHtml = '';
    const fields = formConfig.fields;
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const isTextarea = field.type === 'textarea';
        const isSwitch = field.type === 'switch';

        if (isTextarea) {
            fieldsHtml += `<div class="form-row"><div class="form-item" style="width:100%;">`;
            fieldsHtml += `<label>${field.required ? '<span class="required">*</span>' : ''}${field.label}</label>`;
            fieldsHtml += `<textarea class="form-textarea" placeholder="请输入" name="${field.name}"></textarea>`;
            fieldsHtml += `</div></div>`;
        } else if (isSwitch) {
            fieldsHtml += `<div class="form-row"><div class="form-item">`;
            fieldsHtml += `<label>${field.label}</label>`;
            fieldsHtml += `<label class="switch"><input type="checkbox" ${field.value ? 'checked' : ''} /><span class="slider"></span></label>`;
            fieldsHtml += `</div></div>`;
        } else {
            const next = i + 1 < fields.length && fields[i+1].type !== 'textarea' && fields[i+1].type !== 'switch' ? fields[i+1] : null;
            fieldsHtml += `<div class="form-row">`;
            fieldsHtml += renderField(field);
            if (next) {
                fieldsHtml += renderField(next);
                i++;
            } else {
                fieldsHtml += `<div class="form-item"></div>`;
            }
            fieldsHtml += `</div>`;
        }
    }

    const modalHtml = `
        <div class="modal-overlay" onclick="closeModal(event)">
            <div class="modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <span class="modal-title">${title}</span>
                    <button class="modal-close" onclick="closeModalDirect()">×</button>
                </div>
                <div class="modal-body">
                    ${fieldsHtml}
                </div>
                <div class="modal-footer">
                    <button class="btn" onclick="closeModalDirect()">取消</button>
                    <button class="btn btn-primary" onclick="submitForm('${currentPage}')">确定</button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('modalContainer').innerHTML = modalHtml;
}

function renderField(field) {
    let html = `<div class="form-item">`;
    html += `<label>${field.required ? '<span class="required">*</span>' : ''}${field.label}</label>`;
    if (field.type === 'input') {
        html += `<input type="text" class="form-input" placeholder="${field.placeholder || '请输入'}" name="${field.name}" />`;
    } else if (field.type === 'select') {
        html += `<select class="form-select" name="${field.name}">`;
        field.options.forEach(opt => {
            html += `<option value="${opt}">${opt}</option>`;
        });
        html += `</select>`;
    }
    html += `</div>`;
    return html;
}

function closeModal(event) {
    if (event.target === event.currentTarget) {
        document.getElementById('modalContainer').innerHTML = '';
    }
}

function closeModalDirect() {
    document.getElementById('modalContainer').innerHTML = '';
}

function submitForm(page) {
    closeModalDirect();
    alert('保存成功！');
}

function showChangePassword() {
    const html = `
        <div class="modal-overlay" onclick="closeModal(event)">
            <div class="modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <span class="modal-title">修改密码</span>
                    <button class="modal-close" onclick="closeModalDirect()">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-row"><div class="form-item">
                        <label><span class="required">*</span>原密码</label>
                        <input type="password" class="form-input" placeholder="请输入原密码" />
                    </div></div>
                    <div class="form-row"><div class="form-item">
                        <label><span class="required">*</span>新密码</label>
                        <input type="password" class="form-input" placeholder="请输入新密码" />
                    </div></div>
                    <div class="form-row"><div class="form-item">
                        <label><span class="required">*</span>确认新密码</label>
                        <input type="password" class="form-input" placeholder="请再次输入新密码" />
                    </div></div>
                </div>
                <div class="modal-footer">
                    <button class="btn" onclick="closeModalDirect()">取消</button>
                    <button class="btn btn-primary" onclick="closeModalDirect();alert('密码修改成功！');">确定</button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('modalContainer').innerHTML = html;
}

function logout() {
    if (confirm('确认退出登录？')) {
        alert('已退出登录');
    }
}

// ============ 启动 ============
init();
