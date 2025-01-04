import { ReactNode, ComponentPropsWithRef as ComponentPropsWithRef$1, Dispatch, SetStateAction } from 'react';
import { SpringConfig, ComponentPropsWithRef } from 'react-spring';

type ClickableSurfaceNativeProps = {
    onEnterColor: string;
    onLeaveColor: string;
    onMouseEnterAnimation?: SpringConfig;
    onMouseLeaveAnimation?: SpringConfig;
};
type ClickableSurfaceProps = ComponentPropsWithRef<"div"> & ClickableSurfaceNativeProps & {};
declare function ClickableSurface(props: ClickableSurfaceProps): ReactNode;

type CStackReverseProps = CStackProps & {};
declare function CStackReverse(props: CStackReverseProps): ReactNode;

type CStackProps = CProps & {};
declare function CStack(props: CStackProps): ReactNode;

type CProps = CenterProps & {};
declare function C(props: CProps): ReactNode;

type CenterProps = ComponentPropsWithRef$1<"div"> & {};
declare function Center(props: CenterProps): ReactNode;

type RStackReverseProps = RStackProps & {};
declare function RStackReverse(props: RStackReverseProps): ReactNode;

type RStackProps = RProps & {};
declare function RStack(props: RStackProps): ReactNode;

type RProps = CenterProps & {};
declare function R(props: RProps): ReactNode;

type SpacerProps = ComponentPropsWithRef$1<"div"> & {};
declare function Spacer(props: SpacerProps): ReactNode;

type ZLayerProps = CenterProps & {};
declare function ZLayer(props: ZLayerProps): ReactNode;

type ZProps = CenterProps & {};
declare function Z(props: ZProps): ReactNode;

type ResponsivePageProps = CStackProps & {};
declare function ResponsivePage(props: ResponsivePageProps): ReactNode;

type Device = "DEVICE.LAPTOP" | "DEVICE.TABLET" | "DEVICE.MOBILE";
declare function useDevice(): Device;

type State<T1> = [T1, Dispatch<SetStateAction<T1>>];

export { C, type CProps, CStack, type CStackProps, CStackReverse, type CStackReverseProps, Center, type CenterProps, ClickableSurface, type ClickableSurfaceNativeProps, type ClickableSurfaceProps, type Device, R, type RProps, RStack, type RStackProps, RStackReverse, type RStackReverseProps, ResponsivePage, type ResponsivePageProps, Spacer, type SpacerProps, type State, Z, ZLayer, type ZLayerProps, type ZProps, useDevice };
