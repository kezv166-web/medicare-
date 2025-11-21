import React from 'react';

const Select = ({ value, onValueChange, children }) => {
  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (child.type.displayName === 'SelectTrigger') {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = React.forwardRef(({ className = '', children, value, onValueChange, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const content = React.Children.toArray(children).find(child => child.type?.displayName === 'SelectContent');

  return (
    <>
      <button
        ref={ref}
        type="button"
        className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        {children}
      </button>
      {isOpen && content && React.cloneElement(content, {
        onSelect: (val) => {
          onValueChange?.(val);
          setIsOpen(false);
        }
      })}
    </>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = ({ placeholder }) => {
  return <span className="text-gray-900">{placeholder}</span>;
};
SelectValue.displayName = 'SelectValue';

const SelectContent = ({ children, onSelect }) => {
  return (
    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
      {React.Children.map(children, child =>
        React.cloneElement(child, { onSelect })
      )}
    </div>
  );
};
SelectContent.displayName = 'SelectContent';

const SelectItem = ({ value, children, onSelect }) => {
  return (
    <div
      className="relative flex cursor-pointer select-none items-center px-3 py-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100"
      onClick={() => onSelect?.(value)}
    >
      {children}
    </div>
  );
};
SelectItem.displayName = 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
