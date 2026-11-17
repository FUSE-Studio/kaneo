import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vite-plus/test";
import { ShortcutTestWrapper } from "@/lib/shortcuts/shortcut-test-wrapper";
import { HelpButton } from "./help-button";
import { ShortcutsPanel } from "./shortcuts-panel";
import { useShortcutsPanelStore } from "./shortcuts-panel-store";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  initReactI18next: { type: "3rdParty", init: vi.fn() },
}));

beforeEach(() => {
  useShortcutsPanelStore.setState({ open: false });
});

afterEach(() => {
  cleanup();
});

const press = async (element: Element) => {
  await act(async () => {
    fireEvent.pointerDown(element, { button: 0, pointerType: "mouse" });
    fireEvent.mouseDown(element, { button: 0 });
    fireEvent.pointerUp(element, { button: 0, pointerType: "mouse" });
    fireEvent.mouseUp(element, { button: 0 });
    fireEvent.click(element, { button: 0 });
  });
};

describe("HelpButton", () => {
  it("toggles the help panel", async () => {
    render(
      <ShortcutTestWrapper>
        <HelpButton />
        <ShortcutsPanel />
      </ShortcutTestWrapper>,
    );
    const button = screen.getByRole("button", {
      name: "navigation:help.title",
    });

    await press(button);
    expect(useShortcutsPanelStore.getState().open).toBe(true);
    expect(
      await screen.findByRole("link", { name: /navigation:help\.openDocs/ }),
    ).toHaveAttribute("href", "https://kaneo.app/docs");

    await press(button);
    expect(useShortcutsPanelStore.getState().open).toBe(false);
  });
});
