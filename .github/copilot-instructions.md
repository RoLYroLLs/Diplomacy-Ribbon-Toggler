

# Copilot Instructions for Diplomacy Ribbon Toggler

## Project Overview
- Diplomacy Ribbon Toggler is a Sid Meier's Civilization VII mod that allows the player to toggle the visibility of the diplomacy ribbon UI.
- The mod is written in JavaScript and integrates with Civ VII's modding API and UI system.
- Mod metadata and load order are defined in [src/diplomacy-ribbon-toggler.modinfo](src/diplomacy-ribbon-toggler.modinfo).

## Key Components
- **UI Scripts**: Ribbon toggling logic is in [src/ui/diplo-ribbon/drt-panel-diplo-ribbon-toggler.js](src/ui/diplo-ribbon/drt-panel-diplo-ribbon-toggler.js) and related files. These patch the diplo ribbon to enable hiding/showing the ribbon.
- **Options**: User options are managed in [src/ui/options/drt-options.js](src/ui/options/drt-options.js) and [src/ui/options/mod-options.js](src/ui/options/mod-options.js). These control the ribbon's visibility and persist user choices.
- **Assets**: Custom icons for toggle controls are in [assets/icons/](assets/icons/).
- **Text**: Localized strings for UI labels and options are in [src/text/en_US/](src/text/en_US/).

## Patterns & Conventions
- **UI Patching**: The mod patches the diplomacy ribbon UI to add a toggle control and respond to user actions.
- **Options Namespace**: All mod options are namespaced under `diplomacy-ribbon-toggler` and use a consistent getter/setter pattern.
- **Resource Safety**: Always check for null/undefined before accessing nested properties from the game API.
- **Logging**: Use `console.warn` and `console.error` for mod-specific diagnostics, always prefixed with the mod ID.

## Developer Workflows
- **No build step**: Scripts are loaded directly by the game engine; no transpilation or bundling is required.
- **Testing**: Launch Civ VII with the mod enabled. Use in-game mod options to toggle ribbon visibility and verify UI changes.
- **Debugging**: Use the in-game console (if available) or log output to inspect mod behavior.

## References
- See [README.md](README.md) for user-facing mod description and credits.
- See [src/diplomacy-ribbon-toggler.modinfo](src/diplomacy-ribbon-toggler.modinfo) for mod metadata and load order.

---
For questions about mod structure or Civ VII integration, review the above files for established patterns before introducing new dependencies or workflows.