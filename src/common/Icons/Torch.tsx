import torchlight from "../../assets/icons/torchlight.svg";

export const TorchIcon = ({ size = 30 }: { size?: number }) => (
  <img src={torchlight} style={{ height: size, width: size }} />
);
