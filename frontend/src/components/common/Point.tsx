interface PointProps {
  point: number;
  size?: 'sm' | 'md';
}

const Point = ({ point, size = 'md' }: PointProps) => {
  const sizeClasses = {
    sm: {
      container: 'px-1.5 py-1',
      icon: 'w-6 h-6',
      iconText: 'text-xs',
      text: 'text-sm'
    },
    md: {
      container: 'px-2 py-2',
      icon: 'w-8 h-8',
      iconText: 'text-sm',
      text: 'text-base'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex items-center bg-orange-primary rounded-full ${classes.container}`}>
      <div className={`${classes.icon} text-orange-primary rounded-full bg-white flex items-center justify-center mr-2`}>
        <span className={`text-orange-primary font-bold ${classes.iconText}`}>P</span>
      </div>
      <span className={`text-white font-semibold ${classes.text}`}>{point} P</span>
    </div>
  );
};

export default Point;