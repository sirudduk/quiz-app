export enum BUTTON_SIZE {
  SMALL,
  MEDIUM,
  LARGE,
}

interface ButtonProps {
  title: string;
  size: BUTTON_SIZE;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  const size = {
    [BUTTON_SIZE.SMALL]: 'px-4 py-2 text-sm',
    [BUTTON_SIZE.MEDIUM]: 'px-5 py-3 text-m',
    [BUTTON_SIZE.LARGE]: 'px-6 py-4 text-lg',
  }[props.size || BUTTON_SIZE.LARGE];

  const defaultBtnStyles =
    'border-2 text-gray-600 font-bold border-orange-300 rounded-md';

  return (
    <button className={`${defaultBtnStyles} ${size}`} onClick={props.onClick}>
      {props.title}
    </button>
  );
}
