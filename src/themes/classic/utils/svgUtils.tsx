import type { ComponentType, SVGProps } from 'react';

type SvgComponentType = ComponentType<SVGProps<SVGSVGElement>>;
type SvgComponent = {
  default: SvgComponentType;
};

const FailedLoadSvg: SvgComponentType = () => null;

export const loadSvgComponent = async (
  stats: Record<string, () => Promise<unknown>>,
  path: string
): Promise<SvgComponent> => {
  const load = stats[path];
  if (!load) return { default: FailedLoadSvg };

  try {
    const module = await load();
    return { default: module as SvgComponentType };
  } catch (error) {
    console.error(error);
    return { default: FailedLoadSvg };
  }
};
