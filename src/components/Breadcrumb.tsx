import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb">
      <ol className="breadcrumb-list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {item.href && !item.active ? (
              <a 
                href={item.href} 
                className="breadcrumb-link"
              >
                {item.label}
              </a>
            ) : (
              <span 
                className={`breadcrumb-text ${item.active ? 'breadcrumb-active' : ''}`}
              >
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <ChevronRight className="breadcrumb-separator" size={16} />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}