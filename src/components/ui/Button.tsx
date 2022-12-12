export enum BUTTON_SIZE {
  SMALL,
  MEDIUM,
  LARGE,
}

export default function Button(props: { title: string; size: BUTTON_SIZE }) {
  const size = {
    [BUTTON_SIZE.SMALL]: 'px-4 py-2 text-sm',
    [BUTTON_SIZE.MEDIUM]: 'px-5 py-3 text-m',
    [BUTTON_SIZE.LARGE]: 'px-6 py-4 text-lg',
  }[props.size || BUTTON_SIZE.LARGE];

  return (
    <button
      className={`border text-gray-600 font-bold border-orange-300 rounded-md ${size}`}
    >
      {props.title}
    </button>
  );
}
