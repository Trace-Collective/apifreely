const ART = `        .:-=*#%@%#*=-:.
      .:+#%@@@@@@@@%#+:.
     :*%@@@@@@@@@@@@@@%*:
    =%@@@@@#*++*#%@@@@@%=
   *@@@@%+:.    .:+%@@@@*
  #@@@@*:  .:--:.  :*@@@#
 +@@@@=  :+#%%%%#+:  =@@@+
 %@@@= .*%@@@@@@@@%*. =@@@%
.@@@%  +@@@@@@@@@@@@+  %@@@.
=@@@= :%@@@@@@@@@@@@%: =@@@=
#@@@: =@@@@@@@@@@@@@@= :@@@#
=@@@= :%@@@@@@@@@@@@%: =@@@=
.@@@%  +@@@@@@@@@@@@+  %@@@.
 %@@@= .*%@@@@@@@@%*. =@@@%
 +@@@@=  :+#%%%%#+:  =@@@+
  #@@@@*:  .:--:.  :*@@@#
   *@@@@%+:.    .:+%@@@@*
    =%@@@@@#*++*#%@@@@@%=
     :*%@@@@@@@@@@@@@@%*:
      .:+#%@@@@@@@@%#+:.
        .:-=*#%@%#*=-:.`;

function Crop({ pos }: { pos: string }) {
  const corners: Record<string, string> = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  };
  return <span className={`absolute h-3 w-3 border-line ${corners[pos]}`} />;
}

export function AsciiArt({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Crop pos="tl" />
      <Crop pos="tr" />
      <Crop pos="bl" />
      <Crop pos="br" />
      <pre
        className="select-none font-mono text-[6px] leading-[1.15] text-line-soft"
        aria-hidden
      >
        {ART}
      </pre>
      <span className="absolute -right-1 top-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
        Open access. Open future.
      </span>
    </div>
  );
}
