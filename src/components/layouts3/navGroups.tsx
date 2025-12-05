import { menuItems } from "../../data/menu";

export type NavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
  access?: string[];
};

export type NavGroup = {
  label: string;
  items: NavItem[];
  access?: string[];
};

// Transform menuItems to navGroups format
export const navGroups: NavGroup[] = menuItems
  .map((menuItem) => {
    // If menu item has children, create a nav group
    if (menuItem.children && menuItem.children.length > 0) {
      return {
        label: menuItem.label,
        access: menuItem.access,
        items: menuItem.children.map((child) => ({
          icon: child.icon!,
          label: child.label,
          path: child.path,
          access: child.access,
        })),
      };
    }
    // If no children, create a nav group with single item
    return {
      label: menuItem.label,
      access: menuItem.access,
      items: [
        {
          icon: menuItem.icon!,
          label: menuItem.label,
          path: menuItem.path,
          access: menuItem.access,
        },
      ],
    };
  })
  .filter((group) => group.items.length > 0); // Filter out empty groups
