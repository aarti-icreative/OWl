/** @odoo-module */

import { registry } from "@web/core/registry"
import { kanbanView } from "@web/views/kanban/kanban_view"
import { KanbanController } from "@web/views/kanban/kanban_controller"
import { useService } from "@web/core/utils/hooks"

const { onWillStart } = owl

class ResPartnerKanbanController extends KanbanController {
    setup() {
        super.setup()
        this.action = useService("action")
        this.orm = useService("orm")

        onWillStart(async () => {
            this.customerLocations = await this.orm.readGroup("res.partner", [], ['state_id'], ['state_id'])
        })
    }

    openSalesView() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Customer Sales",
            res_model: "sale.order",
            views: [
                [false, "list"],
                [false, "form"]
            ]
        })
    }

    selectLocations(state) {

        const id = state[0]
        const name = state[1]

        this.env.searchModel.createNewFilters([{
            description: name,
            domain: [
                ['state_id', '=', id]
            ],
        }])

    }
}

ResPartnerKanbanController.template = "owl.ResPartnerKanbanView"

export const resPartnerKanbanView = {
    ...kanbanView,
    Controller: ResPartnerKanbanController,
}

registry.category("views").add("res_partner_kanban_view", resPartnerKanbanView)