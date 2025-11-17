-- simple_table_border.lua - 更简单的实现

function Table(tbl)
    -- 仅修改属性，不重建整个表格
    local attr = tbl.attr or pandoc.Attr()
    
    -- 尝试几种常见的带边框样式名称
    local styles = {
        'Table Grid',          -- 标准网格
        'Grid Table 1 Light',  -- 轻量网格
        'Grid Table',          -- 通用网格
        'Plain Table 1'        -- 备用方案
    }
    
    attr.attributes['custom-style'] = styles[1] -- 使用第一个有效样式
    
    tbl.attr = attr
    return tbl
end
