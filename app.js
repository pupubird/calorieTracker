// Storage Controller

// Item Controller
const ItemCtrl = (function () {
    // Item Constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    // State
    const state = {
        items: [],
        currentItem: null,
        totalCalories: 0
    };

    return {
        getItems: function () {
            return state.items;
        },
        logData: function () {
            return state;
        },
        addItem: function (name, calories) {
            let id;
            if (state.items.length > 0) {
                id = state.items.length
            } else {
                id = 0;
            }
            newItem = new Item(id, name, parseInt(calories));
            state.items.push(newItem);
            return newItem;
        }
    }
})();

// UI Controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
    }

    return {
        populateItemList: function (items) {
            let html = '';

            items.forEach((item) => {
                html += `
                <li class="collection-item" id="${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit fa fa-pencil"></i>
                    </a>
                </li>
                `;
            });

            //insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function () {
            return UISelectors;
        },
        getItemsInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item) {
            // create li element
            document.querySelector(UISelectors.itemList).innerHTML += `
                <li class="collection-item" id="${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit fa fa-pencil"></i>
                    </a>
                </li>
            `;
        },
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        }

    }
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {
    // Load event listener
    const loadEventListener = function () {
        const UISelectors = UICtrl.getSelectors();

        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    };

    const itemAddSubmit = function (e) {
        // Get from input from UI controller
        const input = UICtrl.getItemsInput();

        if (input.name !== '' && input.calories !== '') {
            // add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // add item to ui list
            UICtrl.addListItem(newItem);
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    // Public Method
    return {
        init: function () {
            const items = ItemCtrl.getItems();
            // populate list with items
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                UICtrl.populateItemList(items);
            }
            UICtrl.hideList();
            //load event listener
            loadEventListener();
        }
    }

})(ItemCtrl, UICtrl);

App.init();