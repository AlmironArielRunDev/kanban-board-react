import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";

export function CustomDropdownMenu({ triggerComponent, items }) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        {triggerComponent && triggerComponent()}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-48 rounded-lg bg-white shadow will-change-[opacity,transform]"
          sideOffset={32}
        >
          {items &&
            Object.keys(items).map((item) => (
              <DropdownMenu.Item
                className={clsx(
                  "group p-4 text-body-l leading-none outline-none data-[highlighted]:bg-light-grey",
                  {
                    "text-red": items[item].label.includes("Eliminar"),
                    "cursor-pointer": items[item].isActive,
                    "cursor-not-allowed opacity-50": !items[item].isActive,
                  },
                )}
                key={items[item].label}
                onClick={items[item].onClick}
                disabled={!items[item].isActive}
              >
                {items[item].label}
              </DropdownMenu.Item>
            ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
