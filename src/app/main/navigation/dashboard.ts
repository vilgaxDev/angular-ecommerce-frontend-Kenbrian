
export const Dashboard: any[] = [

    {
        title: 'Category',
        type: 'group',
        children: [
            {
                title: 'Category',
                type: 'item',
                icon: 'dvr',
                url: '/dashboard/category'
            },
            {
                title: 'Subcategory',
                type: 'item',
                icon: 'category',
                url: '/dashboard/subcategory'
            },
        ]
    },
    {
        title: 'Product',
        type: 'group',
        children: [
            {
                title: 'Product',
                type: 'item',
                icon: 'fastfood',
                url: '/dashboard/product'
            }
        ]
    },
    // {
    //     title: 'menu',
    //     type: 'group_menu',
    //     icon: 'keyboard_arrow_down',
    //     children: [
    //         {
    //             title: 'Marketplace',
    //             type: 'item',
    //             icon: 'home',
    //             url: '/',
    //         },
    //         {
    //             title: 'Logout',
    //             type: 'item',
    //             icon: 'input',
    //             method: 'logout'
    //         }
    //     ]
    // }
];
