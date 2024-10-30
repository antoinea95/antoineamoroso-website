export const Picture = () => {
  return (
    <div className="w-72 absolute left-[48.5%] -translate-x-1/2 z-10 group j">
      <img
        src="./assets/big-head.png"
        className="drop-shadow-custom group-hover:hidden"
      />
      <img
        src="./assets/big-head-2.png"
        className="drop-shadow-custom hidden group-hover:block"
      />
    </div>
  );
};
