function List() {}
List.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]
List.prototype.length = 0
List.prototype.add = function(item) {
    if (arguments.length > 1) {
        for (var i=0; i<arguments.length; i++) {
            this.add(arguments[i])
        }
        return this
    }
    
    // null or undefined or single item
    if (item == null || item == undefined
    || item[Symbol.iterator] == undefined
    || typeof item == 'string') {
        this[this.length] = item
        this.length += 1
    }
    // iterable
    else if (item[Symbol.iterator] != undefined) {
        for (var i=0; i<item.length; i++) {
            this[this.length] = item[i]
            this.length += 1
        }
    }
    return this
}
//items.where(i => i.contains('name'))
List.prototype.where = function(conditionFunction) {
    var matchList = new List()
    for (var i=0; i<this.length; i++) {
        if ( conditionFunction(this[i]) )
            matchList.add(this[i])
    }
    return matchList
}
List.prototype.first = function(conditionFunction) {
    for (var i=0; i<this.length; i++)
        if ( conditionFunction(this[i]) )
            return this[i]
    return null
}
List.prototype.forEach = function(actionFunction) {
    for (var i=0; i<this.length; i++)
        actionFunction(this[i])
}
List.prototype.contains = function(conditionFunction) {
    var matches = this.where(conditionFunction)
    return matches.length > 0
}
List.prototype.removeAt = function(index) {
    if (this.length <= 0
    || index < 0 
    || index > (this.length-1))
        return this
    
    var remainingList = new List()
    for (var i=0; i<this.length; i++) {
        if (i == index)
            continue
        remainingList.add(this[i])
    }
    return remainingList
}
List.prototype.remove = function(item) {
    var remainingList = new List()
    for (var i=0; i<this.length; i++) {
        if (this[i] != item)
            remainingList.add(this[i])
    }
    return remainingList
}
