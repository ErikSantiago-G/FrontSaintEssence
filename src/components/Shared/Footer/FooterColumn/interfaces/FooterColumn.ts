export interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}
interface FooterLink {
  label: string;
  url: string;
}