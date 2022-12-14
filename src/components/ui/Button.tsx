export enum BUTTON_SIZE {
  SMALL,
  MEDIUM,
  LARGE,
}

interface ButtonProps {
  title: string;
  size: BUTTON_SIZE;
  onClick: () => void;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const size = {
    [BUTTON_SIZE.SMALL]: 'px-4 py-2 text-sm',
    [BUTTON_SIZE.MEDIUM]: 'px-5 py-3 text-m',
    [BUTTON_SIZE.LARGE]: 'px-6 py-4 text-lg',
  }[props.size];

  const defaultBtnStyles =
    'border-2 text-gray-900 font-bold border-orange-300 rounded-md bg-orange-100 animate-bounce';

  return (
    <button
      className={`${defaultBtnStyles} ${size}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
}
