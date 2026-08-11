/**
 * 智涂云MES系统 - 数据配置
 * 基于实际MES系统(http://125.122.18.184:9000/)采集
 * 包含所有12个模块的页面配置和数据
 */

// 导航菜单结构（与实际系统一致）
const MENU = [
    { id: 'dashboard', icon: '🏠', label: '首页', children: [
        { id: 'dashboard-overview', label: '数据概览', page: 'dashboard-overview' },
        { id: 'dashboard-notice', label: '消息通知', page: 'dashboard-notice' },
    ]},
    { id: 'product', icon: '📦', label: '产品管理', children: [
        { id: 'product-list', label: '产品管理', page: 'product-list' },
        { id: 'product-type', label: '产品类型', page: 'product-type' },
        { id: 'customer', label: '客户管理', page: 'customer' },
    ]},
    { id: 'production', icon: '🏭', label: '生产管理', children: [
        { id: 'production-order', label: '生产订单', page: 'production-order' },
        { id: 'production-task', label: '生产任务', page: 'production-task' },
        { id: 'work-report', label: '报工记录', page: 'work-report' },
        { id: 'work-bench', label: '报工工作台', page: 'work-bench' },
        { id: 'work-param', label: '报工参数', page: 'work-param' },
        { id: 'production-line', label: '生产线', page: 'production-line' },
    ]},
    { id: 'equipment', icon: '⚙️', label: '设备管理', page: 'equipment-list' },
    { id: 'process', icon: '🔧', label: '工序管理', page: 'process-list' },
    { id: 'maintenance', icon: '🛠️', label: '保养计划', page: 'maintenance-plan' },
    { id: 'qc-setting', icon: '✅', label: '质检设置', children: [
        { id: 'qc-item', label: '检验项目', page: 'qc-item' },
    ]},
    { id: 'qc-task', icon: '🔍', label: '质检任务', children: [
        { id: 'qc-incoming', label: '来料检', page: 'qc-incoming' },
        { id: 'qc-outgoing', label: '出货检', page: 'qc-outgoing' },
        { id: 'qc-process', label: '过程检', page: 'qc-process' },
        { id: 'qc-finished', label: '成品入库检', page: 'qc-finished' },
        { id: 'qc-trace', label: '产品信息追溯', page: 'qc-trace' },
        { id: 'qc-batch', label: '批量质检统计', page: 'qc-batch' },
        { id: 'qc-single', label: '单独质检统计', page: 'qc-single' },
    ]},
    { id: 'inventory', icon: '📋', label: '库存管理', page: 'inv-query' },
    { id: 'energy', icon: '⚡', label: '能耗管理', page: 'energy-record' },
    { id: 'data-collect', icon: '📊', label: '数据采集', page: 'dc-record' },
    { id: 'system', icon: '⚙️', label: '系统管理', children: [
        { id: 'sys-employee', label: '员工管理', page: 'sys-employee' },
        { id: 'sys-role', label: '角色管理', page: 'sys-role' },
        { id: 'sys-dept', label: '部门管理', page: 'sys-dept' },
        { id: 'sys-log', label: '操作日志', page: 'sys-log' },
    ]},
];

// 页面配置：每个页面的表格列、搜索字段、按钮等
const PAGE_CONFIG = {
    // ===== 首页 =====
    'dashboard-overview': { type: 'dashboard' },
    'dashboard-notice': { type: 'table', title: '消息通知',
        search: [{ name: 'title', label: '消息标题', type: 'input' }, { name: 'type', label: '消息类型', type: 'select', options: ['全部','系统通知','生产提醒','设备告警','质检通知'] }],
        buttons: [{ text: '标记已读', type: 'primary', action: 'markRead' }, { text: '刷新', type: 'default', action: 'refresh' }],
        columns: [{ key: 'title', label: '消息标题' }, { key: 'type', label: '消息类型', type: 'tag' }, { key: 'content', label: '消息内容' }, { key: 'time', label: '发送时间' }, { key: 'status', label: '状态', type: 'tag' }, { key: 'action', label: '操作', width: 120 }],
        data: [
            { title: '生产订单即将到期', type: '生产提醒', content: '订单MO202601010001将于明日到期，请加快生产进度', time: '2026-01-05 09:00:00', status: '未读' },
            { title: '设备保养提醒', type: '设备告警', content: '空压机月度保养已逾期，请尽快安排', time: '2026-01-04 14:30:00', status: '未读' },
            { title: '来料检验完成', type: '质检通知', content: '批次IC20260101来料检验已完成，结果：合格', time: '2026-01-02 16:00:00', status: '已读' },
        ]
    },

    // ===== 产品管理 =====
    'product-list': { type: 'table', title: '产品管理',
        search: [{ name: 'name', label: '产品名称', type: 'input' }, { name: 'code', label: '产品编号', type: 'input' }, { name: 'type', label: '产品类型', type: 'select', options: ['全部','涂装件','冲压件','注塑件'] }],
        buttons: [{ text: '新增', type: 'primary', action: 'add' }, { text: '导出', type: 'default', action: 'export' }, { text: '刷新', type: 'default', action: 'refresh' }],
        columns: [{ key: 'code', label: '产品编号' }, { key: 'name', label: '产品名称' }, { key: 'type', label: '产品类型' }, { key: 'customer', label: '客户' }, { key: 'unit', label: '单位' }, { key: 'createTime', label: '创建时间' }, { key: 'action', label: '操作', width: 200 }],
        data: [
            { code: 'P20250001', name: '汽车前保险杠', type: '涂装件', customer: '宁波汽配', unit: '件', createTime: '2025-01-15 10:30:00' },
            { code: 'P20250002', name: '发动机罩盖', type: '涂装件', customer: '吉利汽车', unit: '件', createTime: '2025-02-20 14:20:00' },
            { code: 'P20250003', name: '车门饰条', type: '注塑件', customer: '比亚迪', unit: '件', createTime: '2025-03-05 09:15:00' },
            { code: 'P20250004', name: '散热器支架', type: '冲压件', customer: '上汽集团', unit: '件', createTime: '2025-03-18 16:45:00' },
            { code: 'P20250005', name: '后视镜外壳', type: '注塑件', customer: '长安汽车', unit: '件', createTime: '2025-04-10 11:00:00' },
        ]
    },

    'product-type': { type: 'table', title: '产品类型',
        search: [{ name: 'parentType', label: '上级类别', type: 'select', options: ['全部','涂装件','冲压件','注塑件'] }, { name: 'name', label: '名称', type: 'input' }],
        buttons: [{ text: '添加', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }, { text: '搜索', type: 'primary', action: 'search' }, { text: '重置', type: 'default', action: 'reset' }],
        columns: [{ key: 'name', label: '类型名称' }, { key: 'parentType', label: '上级类型' }, { key: 'action', label: '操作', width: 200 }],
        data: [
            { name: '涂装件', parentType: '-', },
            { name: '底漆涂装', parentType: '涂装件' },
            { name: '面漆涂装', parentType: '涂装件' },
            { name: '清漆涂装', parentType: '涂装件' },
            { name: '冲压件', parentType: '-' },
            { name: '注塑件', parentType: '-' },
            { name: '黑色注塑', parentType: '注塑件' },
            { name: '彩色注塑', parentType: '注塑件' },
            { name: '电镀件', parentType: '-' },
        ]
    },

    'customer': { type: 'table', title: '客户管理',
        search: [{ name: 'name', label: '搜索客户', type: 'input', placeholder: '请输入客户名称' }],
        buttons: [{ text: '添加', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }, { text: '搜索', type: 'primary', action: 'search' }],
        columns: [{ key: 'name', label: '客户名称' }, { key: 'contact', label: '联系人' }, { key: 'phone', label: '联系电话' }, { key: 'address', label: '地址' }, { key: 'remark', label: '备注' }, { key: 'action', label: '操作', width: 200 }],
        data: [
            { name: '宁波汽配有限公司', contact: '张经理', phone: '13800138001', address: '宁波市鄞州区工业园区', remark: '长期合作客户' },
        ]
    },

    // ===== 生产管理 =====
    'production-order': { type: 'table', title: '生产订单',
        search: [{ name: 'orderNo', label: '订单编号', type: 'input' }, { name: 'status', label: '订单状态', type: 'select', options: ['全部','待排产','已排产','生产中','已完成','已取消'] }, { name: 'date', label: '下单日期', type: 'input', placeholder: 'YYYY-MM-DD' }],
        buttons: [{ text: '新增', type: 'primary', action: 'add' }, { text: '导出', type: 'default', action: 'export' }, { text: '刷新', type: 'default', action: 'refresh' }],
        columns: [{ key: 'orderNo', label: '订单编号' }, { key: 'product', label: '产品' }, { key: 'quantity', label: '数量' }, { key: 'customer', label: '客户' }, { key: 'status', label: '状态', type: 'tag' }, { key: 'planStart', label: '计划开始' }, { key: 'planEnd', label: '计划完成' }, { key: 'action', label: '操作', width: 250 }],
        data: [
            { orderNo: 'MO202601010001', product: '汽车前保险杠', quantity: 500, customer: '宁波汽配', status: '生产中', planStart: '2026-01-05', planEnd: '2026-01-15' },
            { orderNo: 'MO202601020002', product: '发动机罩盖', quantity: 300, customer: '吉利汽车', status: '待排产', planStart: '2026-01-10', planEnd: '2026-01-20' },
            { orderNo: 'MO202601030003', product: '车门饰条', quantity: 1000, customer: '比亚迪', status: '已完成', planStart: '2025-12-20', planEnd: '2026-01-05' },
            { orderNo: 'MO202601040004', product: '散热器支架', quantity: 200, customer: '上汽集团', status: '已排产', planStart: '2026-01-15', planEnd: '2026-01-25' },
            { orderNo: 'MO202601050005', product: '后视镜外壳', quantity: 800, customer: '长安汽车', status: '生产中', planStart: '2026-01-08', planEnd: '2026-01-18' },
        ]
    },

    'production-task': { type: 'table', title: '生产任务',
        search: [{ name: 'taskNo', label: '任务编号', type: 'input' }, { name: 'status', label: '任务状态', type: 'select', options: ['全部','待执行','执行中','已完成','已暂停'] }],
        buttons: [{ text: '刷新', type: 'default', action: 'refresh' }],
        columns: [{ key: 'taskNo', label: '任务编号' }, { key: 'orderNo', label: '关联订单' }, { key: 'process', label: '工序' }, { key: 'quantity', label: '任务数量' }, { key: 'completed', label: '已完成' }, { key: 'status', label: '状态', type: 'tag' }, { key: 'assignee', label: '执行人' }, { key: 'action', label: '操作', width: 150 }],
        data: [
            { taskNo: 'TK20260101', orderNo: 'MO202601010001', process: '前处理', quantity: 500, completed: 320, status: '执行中', assignee: '张三' },
            { taskNo: 'TK20260102', orderNo: 'MO202601010001', process: '喷涂', quantity: 500, completed: 0, status: '待执行', assignee: '李四' },
            { taskNo: 'TK20260103', orderNo: 'MO202601030003', process: '包装', quantity: 1000, completed: 1000, status: '已完成', assignee: '王五' },
        ]
    },

    'work-report': { type: 'table', title: '报工记录',
        search: [{ name: 'processName', label: '工序名称', type: 'input' }, { name: 'orderNo', label: '生产订单', type: 'input' }, { name: 'product', label: '产品', type: 'input' }, { name: 'reporter', label: '报工人员', type: 'input' }, { name: 'reportDate', label: '报工时间', type: 'input', placeholder: 'YYYY-MM-DD' }, { name: 'createDate', label: '创建时间', type: 'input', placeholder: 'YYYY-MM-DD' }],
        buttons: [{ text: '刷新', type: 'default', action: 'refresh' }, { text: '搜索', type: 'primary', action: 'search' }, { text: '重置', type: 'default', action: 'reset' }],
        columns: [{ key: 'orderNo', label: '生产订单编号' }, { key: 'product', label: '产品名称' }, { key: 'processName', label: '工序名称' }, { key: 'reporter', label: '报工人员' }, { key: 'completedQty', label: '完成数量' }, { key: 'defectQty', label: '不良品数量' }, { key: 'reportTime', label: '报工时间' }, { key: 'defectReason', label: '不良品原因' }, { key: 'remark', label: '备注' }, { key: 'createTime', label: '创建时间' }, { key: 'action', label: '操作', width: 150 }],
        data: [
            { orderNo: 'MO202601010001', product: '汽车前保险杠', processName: '前处理', reporter: '张三', completedQty: 320, defectQty: 3, reportTime: '2026-01-05 17:00:00', defectReason: '表面划伤', remark: '', createTime: '2026-01-05 17:05:00' },
            { orderNo: 'MO202601010001', product: '汽车前保险杠', processName: '前处理', reporter: '张三', completedQty: 280, defectQty: 1, reportTime: '2026-01-04 17:00:00', defectReason: '色差', remark: '', createTime: '2026-01-04 17:10:00' },
            { orderNo: 'MO202601030003', product: '车门饰条', processName: '包装', reporter: '王五', completedQty: 500, defectQty: 0, reportTime: '2026-01-03 16:30:00', defectReason: '', remark: '包装完好', createTime: '2026-01-03 16:35:00' },
        ]
    },

    'work-bench': { type: 'custom', title: '报工工作台',
        render: 'renderWorkBench'
    },

    'work-param': { type: 'table', title: '报工参数',
        search: [{ name: 'name', label: '参数名称', type: 'input' }],
        buttons: [{ text: '新增', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }],
        columns: [{ key: 'name', label: '参数名称' }, { key: 'code', label: '参数编码' }, { key: 'type', label: '参数类型' }, { key: 'unit', label: '单位' }, { key: 'remark', label: '备注' }, { key: 'action', label: '操作', width: 200 }],
        data: [
            { name: '标准工时', code: 'STD_TIME', type: '数值', unit: '分钟', remark: '单件标准加工时间' },
            { name: '标准产能', code: 'STD_CAP', type: '数值', unit: '件/小时', remark: '每小时标准产能' },
            { name: '不良率上限', code: 'DEFECT_LIMIT', type: '百分比', unit: '%', remark: '不良率告警阈值' },
        ]
    },

    'production-line': { type: 'table', title: '生产线',
        search: [{ name: 'name', label: '产线名称', type: 'input' }],
        buttons: [{ text: '添加', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }],
        columns: [{ key: 'name', label: '产线名称' }, { key: 'desc', label: '产线描述' }, { key: 'enabled', label: '是否启用', type: 'tag' }, { key: 'action', label: '操作', width: 200 }],
        data: [
            { name: '涂装一线', desc: '自动喷涂产线A', enabled: '启用' },
            { name: '涂装二线', desc: '自动喷涂产线B', enabled: '启用' },
            { name: '前处理线', desc: '前处理清洗产线', enabled: '启用' },
            { name: '包装线', desc: '成品包装产线', enabled: '启用' },
        ]
    },

    // ===== 设备管理 =====
    'equipment-list': { type: 'table', title: '设备管理',
        search: [{ name: 'line', label: '生产线', type: 'select', options: ['全部','涂装一线','涂装二线','前处理线','包装线'] }, { name: 'name', label: '设备名称', type: 'input' }],
        buttons: [{ text: '添加', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }, { text: '导出', type: 'default', action: 'export' }, { text: '导入', type: 'default', action: 'import' }],
        columns: [{ key: 'code', label: '设备编码' }, { key: 'name', label: '设备名称' }, { key: 'model', label: '型号' }, { key: 'manufacturer', label: '制造厂商' }, { key: 'status', label: '状态', type: 'tag' }, { key: 'remark', label: '备注' }, { key: 'action', label: '操作', width: 250 }],
        data: [
            { code: 'EQ001', name: '喷漆房A', model: 'SP-2000', manufacturer: '中涂设备', status: '运行中', remark: '涂装一线' },
            { code: 'EQ002', name: '固化炉B', model: 'CU-3000', manufacturer: '北方机械', status: '运行中', remark: '涂装一线' },
            { code: 'EQ003', name: '前处理槽C', model: 'PT-1500', manufacturer: '海纳环保', status: '维修中', remark: '前处理线' },
            { code: 'EQ004', name: '悬挂输送链', model: 'CL-500', manufacturer: '输送设备厂', status: '运行中', remark: '涂装二线' },
            { code: 'EQ005', name: '空压机', model: 'AC-100', manufacturer: '阿特拉斯', status: '备用', remark: '公用设施' },
        ]
    },

    // ===== 工序管理 =====
    'process-list': { type: 'table', title: '工序管理',
        search: [{ name: 'name', label: '工序名称', type: 'input' }],
        buttons: [{ text: '新增', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }],
        columns: [{ key: 'name', label: '工序名称' }, { key: 'type', label: '工序类型' }, { key: 'desc', label: '描述' }, { key: 'sort', label: '排序' }, { key: 'action', label: '操作', width: 200 }],
        data: [
            { name: '前处理', type: '表面处理', desc: '脱脂、水洗、钝化', sort: 1 },
            { name: '喷涂', type: '涂装', desc: '粉末/油漆喷涂', sort: 2 },
            { name: '固化', type: '热处理', desc: '高温固化烘烤', sort: 3 },
            { name: '冷却', type: '辅助', desc: '自然冷却', sort: 4 },
            { name: '检验', type: '质检', desc: '外观及厚度检验', sort: 5 },
            { name: '包装', type: '包装', desc: '产品包装入库', sort: 6 },
        ]
    },

    // ===== 保养计划 =====
    'maintenance-plan': { type: 'table', title: '保养计划',
        search: [{ name: 'equipment', label: '设备', type: 'input' }, { name: 'responsible', label: '负责人', type: 'input' }, { name: 'planName', label: '计划名称', type: 'input' }, { name: 'dateRange', label: '创建时间', type: 'input', placeholder: 'YYYY-MM-DD ~ YYYY-MM-DD' }],
        buttons: [{ text: '新增', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }, { text: '搜索', type: 'primary', action: 'search' }, { text: '重置', type: 'default', action: 'reset' }],
        columns: [{ key: 'equipment', label: '设备名称' }, { key: 'planName', label: '计划名称' }, { key: 'responsible', label: '负责人' }, { key: 'planStart', label: '计划开始时间' }, { key: 'planEnd', label: '计划结束时间' }, { key: 'status', label: '状态', type: 'tag' }, { key: 'remark', label: '备注' }, { key: 'createTime', label: '创建时间' }, { key: 'action', label: '操作', width: 200 }],
        data: [
            { equipment: '喷漆房A', planName: '喷漆房A月度保养', responsible: '李四', planStart: '2026-02-01', planEnd: '2026-02-01', status: '待执行', remark: '常规月保', createTime: '2026-01-15 10:00:00' },
            { equipment: '固化炉B', planName: '固化炉B季度保养', responsible: '李四', planStart: '2026-04-01', planEnd: '2026-04-02', status: '待执行', remark: '季度大保', createTime: '2026-01-10 14:00:00' },
            { equipment: '空压机', planName: '空压机月度保养', responsible: '张三', planStart: '2026-01-15', planEnd: '2026-01-15', status: '已逾期', remark: '常规月保', createTime: '2025-12-20 09:00:00' },
        ]
    },

    // ===== 质检设置 =====
    'qc-item': { type: 'table', title: '检验项目',
        search: [{ name: 'name', label: '项目名称', type: 'input', placeholder: '请输入项目名称模糊搜索' }],
        buttons: [{ text: '添加', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }],
        columns: [{ key: 'name', label: '项目名称' }, { key: 'type', label: '项目类型' }, { key: 'createTime', label: '创建时间' }, { key: 'action', label: '操作', width: 200 }],
        data: [
            { name: '涂层厚度', type: '尺寸检验', createTime: '2025-01-15 10:00:00' },
            { name: '涂层附着力', type: '性能检验', createTime: '2025-01-15 10:05:00' },
            { name: '外观色差', type: '外观检验', createTime: '2025-01-15 10:10:00' },
            { name: '耐盐雾性', type: '性能检验', createTime: '2025-01-15 10:15:00' },
        ]
    },

    // ===== 质检任务 =====
    'qc-incoming': { type: 'table', title: '来料检',
        search: [{ name: 'batchNo', label: '批次号', type: 'input' }, { name: 'status', label: '检验状态', type: 'select', options: ['全部','待检验','检验中','已合格','已不合格'] }],
        buttons: [{ text: '新增', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }],
        columns: [{ key: 'batchNo', label: '批次号' }, { key: 'material', label: '物料' }, { key: 'supplier', label: '供应商' }, { key: 'quantity', label: '数量' }, { key: 'status', label: '状态', type: 'tag' }, { key: 'inspector', label: '检验人' }, { key: 'inspectTime', label: '检验时间' }, { key: 'action', label: '操作', width: 150 }],
        data: [
            { batchNo: 'IC20260101', material: '粉末涂料-黑色', supplier: '立邦', quantity: 500, status: '已合格', inspector: '赵六', inspectTime: '2026-01-02 10:00:00' },
            { batchNo: 'IC20260102', material: '固化剂', supplier: '亨斯迈', quantity: 200, status: '待检验', inspector: '-', inspectTime: '-' },
        ]
    },

    'qc-outgoing': { type: 'table', title: '出货检',
        search: [{ name: 'batchNo', label: '批次号', type: 'input' }, { name: 'status', label: '检验状态', type: 'select', options: ['全部','待检验','检验中','已合格','已不合格'] }],
        buttons: [{ text: '新增', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }],
        columns: [{ key: 'batchNo', label: '批次号' }, { key: 'product', label: '产品' }, { key: 'customer', label: '客户' }, { key: 'quantity', label: '数量' }, { key: 'status', label: '状态', type: 'tag' }, { key: 'inspector', label: '检验人' }, { key: 'inspectTime', label: '检验时间' }, { key: 'action', label: '操作', width: 150 }],
        data: [
            { batchNo: 'OC20260101', product: '汽车前保险杠', customer: '宁波汽配', quantity: 500, status: '已合格', inspector: '赵六', inspectTime: '2026-01-05 16:00:00' },
        ]
    },

    'qc-process': { type: 'table', title: '过程检',
        search: [{ name: 'orderNo', label: '生产订单', type: 'input' }, { name: 'status', label: '检验状态', type: 'select', options: ['全部','待检验','检验中','已合格','已不合格'] }],
        buttons: [{ text: '新增', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }],
        columns: [{ key: 'inspectNo', label: '检验编号' }, { key: 'orderNo', label: '生产订单' }, { key: 'process', label: '工序' }, { key: 'quantity', label: '抽检数量' }, { key: 'status', label: '状态', type: 'tag' }, { key: 'inspector', label: '检验人' }, { key: 'inspectTime', label: '检验时间' }, { key: 'action', label: '操作', width: 150 }],
        data: [
            { inspectNo: 'PC20260101', orderNo: 'MO202601010001', process: '喷涂', quantity: 50, status: '已合格', inspector: '赵六', inspectTime: '2026-01-04 14:00:00' },
        ]
    },

    'qc-finished': { type: 'table', title: '成品入库检',
        search: [{ name: 'batchNo', label: '批次号', type: 'input' }, { name: 'status', label: '检验状态', type: 'select', options: ['全部','待检验','检验中','已合格','已不合格'] }],
        buttons: [{ text: '新增', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }],
        columns: [{ key: 'batchNo', label: '批次号' }, { key: 'product', label: '产品' }, { key: 'quantity', label: '入库数量' }, { key: 'status', label: '状态', type: 'tag' }, { key: 'inspector', label: '检验人' }, { key: 'inspectTime', label: '检验时间' }, { key: 'action', label: '操作', width: 150 }],
        data: [
            { batchNo: 'FC20260101', product: '车门饰条', quantity: 1000, status: '已合格', inspector: '赵六', inspectTime: '2026-01-05 10:00:00' },
        ]
    },

    'qc-trace': { type: 'table', title: '产品信息追溯',
        search: [{ name: 'sn', label: '产品序列号', type: 'input' }, { name: 'batchNo', label: '批次号', type: 'input' }],
        buttons: [{ text: '查询', type: 'primary', action: 'search' }, { text: '重置', type: 'default', action: 'reset' }],
        columns: [{ key: 'sn', label: '序列号' }, { key: 'product', label: '产品' }, { key: 'batchNo', label: '批次号' }, { key: 'orderNo', label: '生产订单' }, { key: 'processInfo', label: '工艺信息' }, { key: 'qcResult', label: '质检结果' }, { key: 'action', label: '操作', width: 150 }],
        data: [
            { sn: 'SN20260105001', product: '汽车前保险杠', batchNo: 'B20260101', orderNo: 'MO202601010001', processInfo: '前处理→喷涂→固化', qcResult: '合格' },
        ]
    },

    'qc-batch': { type: 'table', title: '批量质检统计',
        search: [{ name: 'startDate', label: '开始日期', type: 'input', placeholder: 'YYYY-MM-DD' }, { name: 'endDate', label: '结束日期', type: 'input', placeholder: 'YYYY-MM-DD' }],
        columns: [{ key: 'batchNo', label: '批次号' }, { key: 'product', label: '产品' }, { key: 'total', label: '检验总数' }, { key: 'passed', label: '合格数' }, { key: 'failed', label: '不合格数' }, { key: 'passRate', label: '合格率', type: 'progress' }, { key: 'inspectTime', label: '检验时间' }],
        data: [
            { batchNo: 'B20260101', product: '汽车前保险杠', total: 500, passed: 495, failed: 5, passRate: 99, inspectTime: '2026-01-05' },
            { batchNo: 'B20260102', product: '车门饰条', total: 1000, passed: 998, failed: 2, passRate: 99.8, inspectTime: '2026-01-06' },
        ]
    },

    'qc-single': { type: 'table', title: '单独质检统计',
        search: [{ name: 'sn', label: '序列号', type: 'input' }],
        columns: [{ key: 'sn', label: '序列号' }, { key: 'product', label: '产品' }, { key: 'items', label: '检验项目' }, { key: 'result', label: '检验结果', type: 'tag' }, { key: 'inspector', label: '检验人' }, { key: 'inspectTime', label: '检验时间' }],
        data: [
            { sn: 'SN20260105001', product: '汽车前保险杠', items: '涂层厚度/附着力/色差', result: '合格', inspector: '赵六', inspectTime: '2026-01-05 11:00:00' },
        ]
    },

    // ===== 库存管理 =====
    'inv-query': { type: 'table', title: '仓库库存',
        search: [{ name: 'product', label: '产品', type: 'input' }, { name: 'location', label: '存储位置', type: 'input' }],
        buttons: [{ text: '刷新', type: 'default', action: 'refresh' }, { text: '搜索', type: 'primary', action: 'search' }, { text: '重置', type: 'default', action: 'reset' }],
        columns: [{ key: 'productCode', label: '产品编码' }, { key: 'productName', label: '产品名称' }, { key: 'spec', label: '规格描述' }, { key: 'location', label: '存放位置' }, { key: 'batchNo', label: '批次号' }, { key: 'quantity', label: '在库数量' }, { key: 'action', label: '操作', width: 150 }],
        data: [
            { productCode: 'P20250001', productName: '汽车前保险杠', spec: '500×200×80mm', location: 'A区-01', batchNo: 'B20260101', quantity: 320 },
            { productCode: 'P20250002', productName: '发动机罩盖', spec: '600×400×50mm', location: 'A区-02', batchNo: 'B20260102', quantity: 180 },
            { productCode: 'P20250003', productName: '车门饰条', spec: '1200×30×10mm', location: 'B区-01', batchNo: 'B20260103', quantity: 998 },
            { productCode: 'M001', productName: '粉末涂料-黑色', spec: '25kg/袋', location: '原料仓-R1', batchNo: 'M20260101', quantity: 1200 },
            { productCode: 'M002', productName: '固化剂', spec: '20kg/桶', location: '原料仓-R2', batchNo: 'M20260102', quantity: 80 },
        ]
    },

    // ===== 能耗管理 =====
    'energy-record': { type: 'table', title: '能耗记录',
        search: [{ name: 'type', label: '能耗类型', type: 'select', options: ['全部','电','水','天然气'] }, { name: 'startDate', label: '使用开始', type: 'input', placeholder: 'YYYY-MM-DD' }, { name: 'endDate', label: '使用结束', type: 'input', placeholder: 'YYYY-MM-DD' }],
        buttons: [{ text: '添加', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }, { text: '搜索', type: 'primary', action: 'search' }, { text: '重置', type: 'default', action: 'reset' }],
        columns: [{ key: 'type', label: '能耗类型' }, { key: 'useDate', label: '使用日期' }, { key: 'meterReading', label: '抄表读数' }, { key: 'dailyUsage', label: '当天使用量' }, { key: 'dailyCost', label: '当天费用(元)' }, { key: 'remark', label: '备注' }, { key: 'createTime', label: '创建时间' }, { key: 'creator', label: '创建人' }, { key: 'action', label: '操作', width: 150 }],
        data: [
            { type: '电', useDate: '2026-01-04', meterReading: 103200, dailyUsage: 3200, dailyCost: 2240, remark: '', createTime: '2026-01-05 08:00:00', creator: '张三' },
            { type: '水', useDate: '2026-01-04', meterReading: 50085, dailyUsage: 85, dailyCost: 340, remark: '', createTime: '2026-01-05 08:05:00', creator: '张三' },
            { type: '天然气', useDate: '2026-01-04', meterReading: 30120, dailyUsage: 120, dailyCost: 360, remark: '', createTime: '2026-01-05 08:10:00', creator: '张三' },
            { type: '电', useDate: '2026-01-03', meterReading: 100000, dailyUsage: 3100, dailyCost: 2170, remark: '', createTime: '2026-01-04 08:00:00', creator: '张三' },
        ]
    },

    // ===== 数据采集 =====
    'dc-record': { type: 'table', title: '数据采集',
        search: [{ name: 'name', label: '数据名称', type: 'input' }, { name: 'startDate', label: '开始日期', type: 'input', placeholder: 'YYYY-MM-DD' }],
        buttons: [{ text: '刷新', type: 'default', action: 'refresh' }, { text: '搜索', type: 'primary', action: 'search' }],
        columns: [{ key: 'time', label: '采集时间' }, { key: 'name', label: '数据名称' }, { key: 'value', label: '采集值' }, { key: 'unit', label: '单位' }, { key: 'status', label: '状态', type: 'tag' }],
        data: [
            { time: '2026-01-05 10:00:00', name: '脱脂槽温度', value: 65.5, unit: '℃', status: '正常' },
            { time: '2026-01-05 10:00:00', name: '脱脂槽电导率', value: 12.3, unit: 'mS/cm', status: '正常' },
            { time: '2026-01-05 10:00:00', name: '钝化槽pH值', value: 8.2, unit: 'pH', status: '正常' },
            { time: '2026-01-05 10:01:00', name: '喷漆房温度', value: 25.8, unit: '℃', status: '正常' },
            { time: '2026-01-05 10:01:00', name: '喷漆房湿度', value: 68, unit: '%', status: '预警' },
        ]
    },

    // ===== 系统管理 =====
    'sys-employee': { type: 'table', title: '员工管理',
        search: [{ name: 'name', label: '姓名', type: 'input' }, { name: 'dept', label: '部门', type: 'select', options: ['全部','生产部','质量部','设备部','管理部'] }],
        buttons: [{ text: '添加', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }, { text: '导入', type: 'default', action: 'import' }, { text: '批量删除', type: 'danger', action: 'batchDelete' }],
        columns: [{ key: 'checkbox', label: '', type: 'checkbox' }, { key: 'username', label: '用户名' }, { key: 'name', label: '姓名' }, { key: 'phone', label: '联系电话' }, { key: 'dept', label: '部门' }, { key: 'role', label: '角色' }, { key: 'status', label: '状态', type: 'tag' }, { key: 'action', label: '操作', width: 280 }],
        data: [
            { username: 'admin', name: '管理员', phone: '13800000001', dept: '管理部', role: '超级管理员', status: '启用' },
            { username: 'zhangsan', name: '张三', phone: '13800000002', dept: '生产部', role: '生产主管', status: '启用' },
            { username: 'lisi', name: '李四', phone: '13800000003', dept: '设备部', role: '设备工程师', status: '启用' },
            { username: 'wangwu', name: '王五', phone: '13800000004', dept: '质量部', role: '质检员', status: '启用' },
            { username: 'zhaoliu', name: '赵六', phone: '13800000005', dept: '质量部', role: '质检员', status: '禁用' },
        ]
    },

    'sys-role': { type: 'table', title: '角色管理',
        search: [{ name: 'name', label: '名称', type: 'input', placeholder: '请输入名称搜索' }],
        buttons: [{ text: '添加', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }],
        columns: [{ key: 'name', label: '名称' }, { key: 'desc', label: '描述' }, { key: 'action', label: '操作', width: 250 }],
        data: [
            { name: '超级管理员', desc: '系统最高权限，可管理所有模块' },
            { name: '生产主管', desc: '生产管理权限，可管理订单和任务' },
            { name: '设备工程师', desc: '设备管理权限，可管理设备和保养' },
            { name: '质检员', desc: '质检操作权限，可管理检验任务' },
        ]
    },

    'sys-dept': { type: 'table', title: '部门管理',
        search: [{ name: 'name', label: '名称', type: 'input', placeholder: '请输入名称搜索' }],
        buttons: [{ text: '添加', type: 'primary', action: 'add' }, { text: '刷新', type: 'default', action: 'refresh' }, { text: '导入', type: 'default', action: 'import' }, { text: '批量删除', type: 'danger', action: 'batchDelete' }],
        columns: [{ key: 'name', label: '名称' }, { key: 'desc', label: '描述' }, { key: 'action', label: '操作', width: 250 }],
        data: [
            { name: '管理部', desc: '公司管理层' },
            { name: '生产部', desc: '生产制造部门' },
            { name: '设备部', desc: '设备维护部门' },
            { name: '质量部', desc: '质量检验部门' },
        ]
    },

    'sys-log': { type: 'table', title: '操作日志',
        search: [{ name: 'user', label: '操作人', type: 'input' }, { name: 'startDate', label: '开始日期', type: 'input', placeholder: 'YYYY-MM-DD' }, { name: 'endDate', label: '结束日期', type: 'input', placeholder: 'YYYY-MM-DD' }],
        buttons: [{ text: '刷新', type: 'default', action: 'refresh' }, { text: '搜索', type: 'primary', action: 'search' }, { text: '重置', type: 'default', action: 'reset' }],
        columns: [{ key: 'user', label: '操作人' }, { key: 'module', label: '操作模块' }, { key: 'action', label: '操作内容' }, { key: 'ip', label: 'IP地址' }, { key: 'time', label: '操作时间' }, { key: 'status', label: '状态', type: 'tag' }],
        data: [
            { user: '管理员', module: '系统管理', action: '新增员工: zhaoliu', ip: '192.168.1.100', time: '2026-01-05 14:30:00', status: '成功' },
            { user: '张三', module: '生产管理', action: '新增生产订单: MO202601010001', ip: '192.168.1.101', time: '2026-01-05 10:00:00', status: '成功' },
            { user: '李四', module: '设备管理', action: '新增设备报修: RP20260101', ip: '192.168.1.102', time: '2026-01-03 10:05:00', status: '成功' },
            { user: '王五', module: '质检任务', action: '提交来料检验: IC20260101', ip: '192.168.1.103', time: '2026-01-02 10:30:00', status: '成功' },
        ]
    },
};

// 表单配置：用于新增弹窗
const FORM_CONFIG = {
    'product-list': { title: '新增产品', fields: [
        { name: 'code', label: '产品编号', type: 'input', required: true },
        { name: 'name', label: '产品名称', type: 'input', required: true },
        { name: 'type', label: '产品类型', type: 'select', options: ['涂装件','冲压件','注塑件'], required: true },
        { name: 'customer', label: '客户', type: 'input' },
        { name: 'unit', label: '单位', type: 'input', required: true },
    ]},
    'product-type': { title: '新增产品类型', fields: [
        { name: 'name', label: '类型名称', type: 'input', required: true },
        { name: 'parentType', label: '上级类型', type: 'select', options: ['无','涂装件','冲压件','注塑件'] },
    ]},
    'customer': { title: '新增客户', fields: [
        { name: 'name', label: '客户名称', type: 'input', required: true },
        { name: 'contact', label: '联系人', type: 'input', required: true },
        { name: 'phone', label: '联系电话', type: 'input' },
        { name: 'address', label: '地址', type: 'input' },
        { name: 'remark', label: '备注', type: 'textarea' },
    ]},
    'production-order': { title: '新增生产订单', fields: [
        { name: 'orderNo', label: '订单编号', type: 'input', required: true },
        { name: 'product', label: '产品', type: 'select', options: ['汽车前保险杠','发动机罩盖','车门饰条','散热器支架','后视镜外壳'], required: true },
        { name: 'quantity', label: '数量', type: 'input', required: true },
        { name: 'customer', label: '客户', type: 'select', options: ['宁波汽配','吉利汽车','比亚迪','上汽集团','长安汽车'] },
        { name: 'planStart', label: '计划开始', type: 'input', placeholder: 'YYYY-MM-DD' },
        { name: 'planEnd', label: '计划完成', type: 'input', placeholder: 'YYYY-MM-DD' },
    ]},
    'work-param': { title: '新增报工参数', fields: [
        { name: 'name', label: '参数名称', type: 'input', required: true },
        { name: 'code', label: '参数编码', type: 'input', required: true },
        { name: 'type', label: '参数类型', type: 'select', options: ['数值','百分比','文本'] },
        { name: 'unit', label: '单位', type: 'input' },
        { name: 'remark', label: '备注', type: 'textarea' },
    ]},
    'production-line': { title: '新增生产线', fields: [
        { name: 'name', label: '产线名称', type: 'input', required: true },
        { name: 'desc', label: '产线描述', type: 'textarea' },
        { name: 'enabled', label: '是否启用', type: 'switch', value: true },
    ]},
    'equipment-list': { title: '新增设备', fields: [
        { name: 'code', label: '设备编码', type: 'input', required: true },
        { name: 'name', label: '设备名称', type: 'input', required: true },
        { name: 'model', label: '型号', type: 'input' },
        { name: 'manufacturer', label: '制造厂商', type: 'input' },
        { name: 'status', label: '设备状态', type: 'select', options: ['运行中','停机','维修中','备用'] },
        { name: 'remark', label: '备注', type: 'textarea' },
    ]},
    'process-list': { title: '新增工序', fields: [
        { name: 'name', label: '工序名称', type: 'input', required: true },
        { name: 'type', label: '工序类型', type: 'select', options: ['表面处理','涂装','热处理','质检','包装','辅助'] },
        { name: 'desc', label: '描述', type: 'textarea' },
        { name: 'sort', label: '排序', type: 'input' },
    ]},
    'maintenance-plan': { title: '新增保养计划', fields: [
        { name: 'equipment', label: '设备名称', type: 'select', options: ['喷漆房A','固化炉B','前处理槽C','悬挂输送链','空压机'], required: true },
        { name: 'planName', label: '计划名称', type: 'input', required: true },
        { name: 'responsible', label: '负责人', type: 'input', required: true },
        { name: 'planStart', label: '计划开始时间', type: 'input', placeholder: 'YYYY-MM-DD' },
        { name: 'planEnd', label: '计划结束时间', type: 'input', placeholder: 'YYYY-MM-DD' },
        { name: 'remark', label: '备注', type: 'textarea' },
    ]},
    'qc-item': { title: '新增检验项目', fields: [
        { name: 'name', label: '项目名称', type: 'input', required: true },
        { name: 'type', label: '项目类型', type: 'select', options: ['外观检验','尺寸检验','性能检验','材料检验'] },
    ]},
    'qc-incoming': { title: '新增来料检验', fields: [
        { name: 'batchNo', label: '批次号', type: 'input', required: true },
        { name: 'material', label: '物料', type: 'input', required: true },
        { name: 'supplier', label: '供应商', type: 'input' },
        { name: 'quantity', label: '数量', type: 'input' },
    ]},
    'qc-outgoing': { title: '新增出货检验', fields: [
        { name: 'batchNo', label: '批次号', type: 'input', required: true },
        { name: 'product', label: '产品', type: 'input', required: true },
        { name: 'customer', label: '客户', type: 'input' },
        { name: 'quantity', label: '数量', type: 'input' },
    ]},
    'qc-process': { title: '新增过程检验', fields: [
        { name: 'inspectNo', label: '检验编号', type: 'input', required: true },
        { name: 'orderNo', label: '生产订单', type: 'input', required: true },
        { name: 'process', label: '工序', type: 'select', options: ['前处理','喷涂','固化','冷却','检验','包装'] },
        { name: 'quantity', label: '抽检数量', type: 'input' },
    ]},
    'qc-finished': { title: '新增成品入库检验', fields: [
        { name: 'batchNo', label: '批次号', type: 'input', required: true },
        { name: 'product', label: '产品', type: 'input', required: true },
        { name: 'quantity', label: '入库数量', type: 'input' },
    ]},
    'energy-record': { title: '新增能耗记录', fields: [
        { name: 'type', label: '能耗类型', type: 'select', options: ['电','水','天然气'], required: true },
        { name: 'useDate', label: '使用日期', type: 'input', placeholder: 'YYYY-MM-DD', required: true },
        { name: 'meterReading', label: '抄表读数', type: 'input', required: true },
        { name: 'dailyUsage', label: '当天使用量', type: 'input' },
        { name: 'dailyCost', label: '当天费用(元)', type: 'input' },
        { name: 'remark', label: '备注', type: 'textarea' },
    ]},
    'sys-employee': { title: '添加员工', fields: [
        { name: 'username', label: '用户名', type: 'input', required: true },
        { name: 'name', label: '姓名', type: 'input', required: true },
        { name: 'phone', label: '联系电话', type: 'input' },
        { name: 'dept', label: '部门', type: 'select', options: ['生产部','质量部','设备部','管理部'] },
        { name: 'role', label: '角色', type: 'select', options: ['超级管理员','生产主管','设备工程师','质检员'] },
        { name: 'password', label: '初始密码', type: 'input', required: true },
        { name: 'enabled', label: '启用', type: 'switch', value: true },
    ]},
    'sys-role': { title: '新增角色', fields: [
        { name: 'name', label: '名称', type: 'input', required: true },
        { name: 'desc', label: '描述', type: 'textarea' },
    ]},
    'sys-dept': { title: '新增部门', fields: [
        { name: 'name', label: '名称', type: 'input', required: true },
        { name: 'desc', label: '描述', type: 'textarea' },
    ]},
};

// 看板数据
const DASHBOARD_DATA = {
    stats: [
        { label: '今日订单', value: 12, icon: '📋', color: '#1890ff', trend: '+3' },
        { label: '进行中', value: 8, icon: '🔄', color: '#faad14', trend: '+1' },
        { label: '紧急订单', value: 2, icon: '⚠️', color: '#ff4d4f', trend: '0' },
        { label: '已完成', value: 5, icon: '✅', color: '#52c41a', trend: '+2' },
    ],
    weeklyChart: [
        { day: '周一', value: 120 },
        { day: '周二', value: 180 },
        { day: '周三', value: 150 },
        { day: '周四', value: 220 },
        { day: '周五', value: 200 },
        { day: '周六', value: 90 },
        { day: '周日', value: 60 },
    ],
    defectReasons: [
        { name: '表面划伤', count: 8, percentage: 40 },
        { name: '色差', count: 5, percentage: 25 },
        { name: '厚度不足', count: 4, percentage: 20 },
        { name: '流挂', count: 2, percentage: 10 },
        { name: '其他', count: 1, percentage: 5 },
    ],
    orderExpiry: [
        { orderNo: 'MO202601010001', product: '汽车前保险杠', daysLeft: 2, status: '紧急' },
        { orderNo: 'MO202601050005', product: '后视镜外壳', daysLeft: 5, status: '正常' },
        { orderNo: 'MO202601020002', product: '发动机罩盖', daysLeft: 10, status: '正常' },
    ],
    todayReports: [
        { reporter: '张三', process: '前处理', product: '汽车前保险杠', qty: 320, defectQty: 3, time: '17:00' },
        { reporter: '王五', process: '包装', product: '车门饰条', qty: 500, defectQty: 0, time: '16:30' },
        { reporter: '李四', process: '喷涂', product: '后视镜外壳', qty: 150, defectQty: 1, time: '16:00' },
    ],
};
