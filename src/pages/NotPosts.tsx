type Props = {
   notPostName: string
   notPostDescription: string
}

export const NotPosts = ({ notPostName, notPostDescription }: Props) => {
	return <div className="container w-auto h-screen flex flex-col items-center justify-center gap-5">
      <span className="text-9xl max-[426px]:text-8xl">😓</span>
      <h1 className="text-[var(--color)] text-4xl font-semibold text-center max-[426px]:text-3xl">{notPostName}</h1>
      <p className="text-[var(--footer-text-color)] text-2xl w-auto text-center max-[426px]:text-[20px]">{notPostDescription}</p>
   </div>;
};