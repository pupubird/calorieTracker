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
        items: [
            { id: 0, name: 'Steak Dinner', calories: 1200 },
            { id: 1, name: 'Cookies', calories: 400 },
            { id: 2, name: 'Eggs', calories: 300 }
        ],
        currentItem: null,
        totalCalories: 0
    };

    return {
        getItems: function () {
            return state.items;
        },
        logData: function () {
            return state;
        }
    }
})();

// UI Controller
const UICtrl = (function () {
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
            document.querySelector('#item-list').innerHTML = html;
        }

    }
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {


    // Public Method
    return {
        init: function () {
            const items = ItemCtrl.getItems();

            // populate list with items
            UICtrl.populateItemList(items);
        }
    }

})(ItemCtrl, UICtrl);

App.init();