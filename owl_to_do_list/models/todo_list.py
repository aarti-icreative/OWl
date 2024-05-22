# -*- coding: utf-8 -*-

from odoo import models, fields, api


class ToDoList(models.Model):
    _name = 'todo.list'
    _description = 'Todo List'

    name = fields.Char(string="Task Name")
    color = fields.Char("")
    completed = fields.Boolean()
