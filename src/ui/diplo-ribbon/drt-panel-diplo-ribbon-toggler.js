import { A as Audio } from '/core/ui/audio-base/audio-support.chunk.js';
import DrtOptions from '../options/drt-options.js';

export class DRT_PanelDiploRibbonToggler {
  constructor() {
    console.trace(`Diplomacy Ribbon Toggler: Initializing DRT_PanelDiploRibbonToggler.`);
    this.diploRibbonPanelHotkeyListener = this.toggleDiploRibbonPanel.bind(this);
  }

  beforeAttach() {
    console.trace(`Diplomacy Ribbon Toggler: DRT_PanelDiploRibbonToggler.beforeAttach: Adding event listener for hotkey-drt-toggle-diplo-ribbon-panel.`);
    window.addEventListener('hotkey-drt-toggle-diplo-ribbon-panel', this.diploRibbonPanelHotkeyListener);
  }

  afterAttach() {
    console.trace(`Diplomacy Ribbon Toggler: DRT_PanelDiploRibbonToggler.afterAttach: No additional actions.`);
    const el = document?.querySelector("panel-diplo-ribbon");
    if (el) {
      this.applyDesiredState(el);
    }
  }

  beforeDetach() {
    console.trace(`Diplomacy Ribbon Toggler: DRT_PanelDiploRibbonToggler.beforeDetach: Removing event listener for hotkey-drt-toggle-diplo-ribbon-panel.`);
    window.removeEventListener('hotkey-drt-toggle-diplo-ribbon-panel', this.diploRibbonPanelHotkeyListener);
  }

  afterDetach() {
    console.trace(`Diplomacy Ribbon Toggler: DRT_PanelDiploRibbonToggler.afterDetach: No additional actions.`);
  }

  toggleDiploRibbonPanel() {
    console.trace("Diplomacy Ribbon Toggler: DRT_PanelDiploRibbonToggler.toggleDiploRibbonPanel: Toggling diplomacy ribbon visibility.");
    const el = document?.querySelector("panel-diplo-ribbon");
    if (!el) {
      console.warn("Diplomacy Ribbon Toggler: No ribbon element found.");
      return;
    }

    const nextHidden = !DrtOptions.DiploRibbonHidden;
    DrtOptions.DiploRibbonHidden = nextHidden;

    // animate the current instance
    this.setHidden(el, nextHidden);

    Audio.playSound("data-audio-primary-button-press");
    return false;
  }

  applyDesiredState(el) {
    const hidden = DrtOptions.DiploRibbonHidden;

    // no animation on restore — just force correct state
    el.classList.remove("animate-in-right-drt", "animate-out-right-drt");
    el.classList.toggle("hidden-drt", hidden);
  }

  setHidden(el, shouldHide) {
    console.trace(`Diplomacy Ribbon Toggler: DRT_PanelDiploRibbonToggler.setHidden: Setting ribbon hidden status to ${shouldHide}.`);
    if (!el) {
      console.warn("Diplomacy Ribbon Toggler: No element sent.");
      return;
    }

    // kill any pending hide end handler
    if (el._onHideEnd) {
      el.removeEventListener("animationend", el._onHideEnd);
      el._onHideEnd = null;
    }

    if (shouldHide) {
      // stop any in animation
      el.classList.remove("animate-in-right-drt");

      // must be visible to animate out
      el.classList.remove("hidden-drt");
      el.classList.add("animate-out-right-drt");

      el._onHideEnd = (e) => {
        if (e.animationName !== "AnimateOutRight") return;

        el.classList.add("hidden-drt");
        el.classList.remove("animate-out-right-drt");

        el.removeEventListener("animationend", el._onHideEnd);
        el._onHideEnd = null;
      };

      el.addEventListener("animationend", el._onHideEnd);
    } else {
      // stop any out animation + show
      el.classList.remove("animate-out-right-drt");
      el.classList.remove("hidden-drt");

      // restart in animation reliably
      el.classList.remove("animate-in-right-drt");
      void el.offsetWidth; // force reflow so the animation re-triggers
      el.classList.add("animate-in-right-drt");
    }
  }
}

Controls.loadStyle("fs://game/ui/diplo-ribbon/drt-panel-diplo-ribbon-toggler.css");
Controls.decorate('panel-diplo-ribbon', (component) => new DRT_PanelDiploRibbonToggler(component));
