// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {container} from '../models';
import {image} from '../models';
import {types} from '../models';
import {settings} from '../models';

export function CheckConnection(arg1:string):Promise<boolean>;

export function ContainerInspect(arg1:string):Promise<container.ContainerDetail>;

export function ContainerPause(arg1:string):Promise<boolean>;

export function ContainerPs():Promise<Array<container.Container>>;

export function ContainerRemove(arg1:string):Promise<boolean>;

export function ContainerRestart(arg1:string):Promise<boolean>;

export function ContainerStart(arg1:string):Promise<boolean>;

export function ContainerStop(arg1:string):Promise<boolean>;

export function ContainerUnpause(arg1:string):Promise<boolean>;

export function ImageInspect(arg1:string):Promise<image.ImageDetail>;

export function ImageLs():Promise<Array<types.ImageSummary>>;

export function ImageRemove(arg1:string):Promise<boolean>;

export function SaveSettings(arg1:settings.Settings):Promise<boolean>;

export function Settings():Promise<settings.Settings>;
