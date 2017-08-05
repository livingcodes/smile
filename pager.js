function Pager(item_count, items_per_page) {
    this.item_count = item_count;
    this.items_per_page = items_per_page == undefined ? 10 : items_per_page;
    this.page_index = 0;
    this.page_count = Math.ceil(this.item_count / this.items_per_page);

    this.lower_item_index = function() {
        return this.page_index*this.items_per_page;
    };
    this.upper_item_index = function() {
        return this.page_index == this.page_count-1
            ? this.item_count-1
            : this.page_index*this.items_per_page + this.items_per_page-1;
    };
    
    this.go_to = function(page_index) {
        this.page_index = page_index;
    };
}

var pager = new Pager(32);
console.log("page count: " + pager.page_count);
console.log("page index: " + pager.page_index + ", " + pager.lower_item_index() + ", " + pager.upper_item_index());

pager.go_to(1);
console.log("page index: " + pager.page_index + ", " + pager.lower_item_index() + ", " + pager.upper_item_index());

pager.go_to(pager.page_count-1);
console.log("page index: " + pager.page_index + ", " + pager.lower_item_index() + ", " + pager.upper_item_index());

var big_pager = new Pager(32, 20);
console.log("page count: " + big_pager.page_count);
console.log("page index: " + big_pager.page_index + ", " + big_pager.lower_item_index() + ", " + big_pager.upper_item_index());

big_pager.go_to(1);
console.log("page index: " + big_pager.page_index + ", " + big_pager.lower_item_index() + ", " + big_pager.upper_item_index());