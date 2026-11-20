import './Skeleton.css';

export function Skeleton({ height = '120px', width = '100%', style = {} }) {
  return <div className="ds-skeleton" style={{ height, width, ...style }} aria-hidden="true" />;
}