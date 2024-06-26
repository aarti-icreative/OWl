# -*- coding: utf-8 -*-
{
    'name': "OWL Todo List",
    'summary': "Todo List",
    'description': """Todo List""",
    'author': "My Company",
    'website': "https://www.yourcompany.com",
    'category': 'Uncategorized',
    'version': '17.0.1.0.0',
    'depends': ['base','web'],
    "license": "LGPL-3",
    'data': [
        'security/ir.model.access.csv',
        'views/todo_list.xml',
        'views/res_partner.xml',
    ],
    'assets':{
        'web.assets_backend': [
            'owl_to_do_list/static/src/components/*/*.js',
            'owl_to_do_list/static/src/components/*/*.xml',
            'owl_to_do_list/static/src/components/*/*.scss',
        ],
    }

}
