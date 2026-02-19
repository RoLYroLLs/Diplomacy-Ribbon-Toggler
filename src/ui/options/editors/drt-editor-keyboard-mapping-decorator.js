
export class DRTEditorKeyboardMappingDecorator {
    constructor(component) {
        this.component = component;
    }

    beforeAttach() {
        this.addAction("drt-toggle-diplo-ribbon-panel", InputContext.World);
    }

    afterAttach() {
    }

    beforeDetach() {
    }

    afterDetach() {
    }

    // Taken from original addActionsForContext function.
    addAction(actionIdString, inputContext) {
        const actionId = Input.getActionIdByName(actionIdString);
        if (!actionId) {
            return;
        }
        if (this.component.mappingDataMap.has(actionId)) {
            // This action has already been added. Skip it!
            return;
        }
        this.component.actionContainer.appendChild(this.component.createActionEntry(actionId, inputContext));
    }
}

Controls.decorate('editor-keyboard-mapping', (component) => new DRTEditorKeyboardMappingDecorator(component));
