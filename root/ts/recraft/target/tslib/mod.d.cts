import { ReactNode, ComponentPropsWithRef as ComponentPropsWithRef$1, Dispatch, SetStateAction } from 'react';
import { ComponentPropsWithRef, SpringConfig } from 'react-spring';

type ClickableSurfaceProps = ComponentPropsWithRef<"div"> & {
    onEnterColor: string;
    onLeaveColor: string;
    onMouseEnterAnimation?: SpringConfig;
    onMouseLeaveAnimation?: SpringConfig;
};
declare function ClickableSurface({ onEnterColor, onLeaveColor, onMouseEnterAnimation, onMouseLeaveAnimation, style, children, ...more }: ClickableSurfaceProps): ReactNode;

type Device = "DEVICE.LAPTOP" | "DEVICE.TABLET" | "DEVICE.MOBILE";
declare function useDevice(): Device;

type CStackReverseProps = CStackProps & {};
declare function CStackReverse({ style, children, ...more }: CStackReverseProps): ReactNode;

type CStackProps = CProps & {};
declare function CStack({ style, children, ...more }: CStackProps): ReactNode;

type CProps = CenterProps & {};
declare function C({ style, children, ...more }: CProps): ReactNode;

type CenterProps = ComponentPropsWithRef$1<"div"> & {};
declare function Center({ style, children, ...more }: CenterProps): ReactNode;

type RStackReverseProps = RStackProps & {};
declare function RStackReverse({ style, children, ...more }: RStackReverseProps): ReactNode;

type RStackProps = RProps & {};
declare function RStack({ style, children, ...more }: RStackProps): ReactNode;

type RProps = CenterProps & {};
declare function R({ style, children, ...more }: RProps): ReactNode;

type SpacerProps = ComponentPropsWithRef$1<"div"> & {};
declare function Spacer({ style, children, ...more }: SpacerProps): ReactNode;

type ZProps = CenterProps & {};
declare function Z({ style, children, ...more }: ZProps): ReactNode;

type ZLayerProps = CenterProps & {};
declare function ZLayer({ style, children, ...more }: ZLayerProps): ReactNode;

type ResponsivePageProps = CStackProps & {};
declare function ResponsivePage({ style, children, ...more }: ResponsivePageProps): ReactNode;

type State<T1> = [T1, Dispatch<SetStateAction<T1>>];

export { C, type CProps, CStack, type CStackProps, CStackReverse, type CStackReverseProps, Center, type CenterProps, ClickableSurface, type ClickableSurfaceProps, type Device, R, type RProps, RStack, type RStackProps, RStackReverse, type RStackReverseProps, ResponsivePage, type ResponsivePageProps, Spacer, type SpacerProps, type State, Z, ZLayer, type ZLayerProps, type ZProps, useDevice };
