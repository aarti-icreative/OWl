/** @odoo-module */

import { registry } from "@web/core/registry"
import { kanbanView } from "@web/views/kanban/kanban_view"
import { KanbanController } from "@web/views/kanban/kanban_controller"
import { useService } from "@web/core/utils/hooks"

class KanbanController extends KanbanController {
    setup() {
        super.setup()
        this.action = useService("action")
    }

    openSalesView(){
        console.log("Open Sales view")
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Customer Sales",
            res_model: "sale.order",
            views: [[false, "list"], [false, "form"]]
        })
    }
}



export const resPartnerKanbanView = {
    ...kanbanView,
    Controller: ResPartnerFormController,
    button.template = "owl.ResPartnerKanbanView",
}

registry.category("views").add("res_partner_kanban_view", resPartnerKanbanView)