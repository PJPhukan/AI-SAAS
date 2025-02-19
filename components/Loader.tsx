import Image from "next/image";

const Loader = () => {
  return (
    <div className="h-4 flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10  ">
        <Image
          src="/logo.png"
          alt="logo"
          height={40}
          width={40}
          className="animate-spin"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Genix is processing your request...
      </p>
    </div>
  );
};

export default Loader;
