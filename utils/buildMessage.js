function buildmessage(entity, action) {
    
    if (action === 'list') {
        return `${entity}s ${action}ed`;    
    }
    
    return `${entity} ${action}d`;
}

module.exports = buildmessage;