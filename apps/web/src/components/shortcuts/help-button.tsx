import { CircleHelp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShortcutTooltipLabel } from "./shortcut-tooltip-label";
import { useShortcutsPanelStore } from "./shortcuts-panel-store";

export function HelpButton() {
  const { t } = useTranslation();
  const open = useShortcutsPanelStore((state) => state.open);
  const setOpen = useShortcutsPanelStore((state) => state.setOpen);
  const label = t("navigation:help.title");

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={label}
            aria-expanded={open}
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(!open)}
          />
        }
      >
        <CircleHelp />
      </TooltipTrigger>
      <TooltipContent>
        <ShortcutTooltipLabel label={label} shortcutId="openShortcuts" />
      </TooltipContent>
    </Tooltip>
  );
}
