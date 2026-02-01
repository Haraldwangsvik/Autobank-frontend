interface Props {
  title: string;
  color: "blue" | "white" | "orange" | "green" | "darkGreen" | "primary" | "secondary";
  size?: "small";
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  className?: string;
}

const Button = (props: Props) => {
  let sizeClasses = "";

  const colorClassesMap = {
    green: "bg-online-blue-300 text-online-blue-900 hover:bg-online-blue-200",
    blue: "bg-online-blue-400 text-white hover:bg-online-blue-300",
    orange: "bg-online-orange text-online-blue-900 hover:bg-online-orange-400",
    white: "bg-white text-online-blue hover:bg-gray-100",
    darkGreen: "bg-online-blue-700 text-white hover:bg-online-blue-600",
    primary: "bg-online-blue text-white hover:bg-online-blue-600",
    secondary: "bg-online-orange text-online-blue-900 hover:bg-online-orange-400",
  };

  // Use the `props.color` to dynamically get the class, with a fallback if needed.
  let colorClasses = colorClassesMap[props.color] || colorClassesMap.primary;

  // Determine button size
  if (props.size === "small") {
    sizeClasses = "w-[100px] h-[40px] px-5 py-2.5 text-sm";
  } else {
    sizeClasses = "w-[140px] h-[50px] px-6 py-3";
  }

  // Combine class names, ensuring `props.className` is applied last for higher precedence
  const className = `flex items-center justify-center p-2 h-[40px] justify-self-end relative z-20 font-medium text-center transition-all duration-200 shadow-sm focus:ring-2 focus:ring-online-orange focus:ring-offset-2 inline-flex items-center gap-1.5 ${colorClasses} ${sizeClasses} rounded-lg ${
    props.className || ""
  }`;

  if (props.href) {
    return (
      <a href={props.href} className={className}>
        {props.title}
        {props.icon}
      </a>
    );
  }

  return (
    <button type="button" onClick={props.onClick} className={className}>
      {props.title}
      {props.icon}
    </button>
  );
};

export default Button;
