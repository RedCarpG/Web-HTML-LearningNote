class AsideNav {

    constructor(class_name) {
        this.main = document.querySelector(class_name);

        this.lis = this.main.querySelectorAll(".aside_list .aside_list_item");
        
        this.parentNavs = this.main.querySelectorAll(".aside_list .aside_list_item .parent_nav");

        this.init();

    }

    init() {
        for(var i=0; i<this.lis.length; i++) {
            this.parentNavs[i].onclick = this.toggleNavUnfold.bind(this, this.parentNavs[i]);
        }
    }

    // Toggle Unfold method
    toggleNavUnfold(node) {
        var li = node.parentNode;
        li.classList.add("active");
        node.onclick = this.toggleNavFold.bind(this, node);
    }
    
    // Toggle Fold method
    toggleNavFold(node) {
        var li = node.parentNode;
        li.className = "aside_list_item";
        node.onclick = this.toggleNavUnfold.bind(this, node);
    }
}

var asideNav = new AsideNav(".aside");