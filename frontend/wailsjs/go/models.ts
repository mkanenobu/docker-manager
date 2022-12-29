export namespace container {
	
	export class Container {
	    Id: string;
	    Names: string[];
	    Image: string;
	    ImageID: string;
	    Command: string;
	    Created: number;
	    Ports?: types.Port[];
	    Labels?: {[key: string]: string};
	    State: string;
	    Status: string;
	
	    static createFrom(source: any = {}) {
	        return new Container(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Names = source["Names"];
	        this.Image = source["Image"];
	        this.ImageID = source["ImageID"];
	        this.Command = source["Command"];
	        this.Created = source["Created"];
	        this.Ports = this.convertValues(source["Ports"], types.Port);
	        this.Labels = source["Labels"];
	        this.State = source["State"];
	        this.Status = source["Status"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class HostConfig {
	    Dns: string[];
	    DnsOptions: string[];
	    DnsSearch: string[];
	    CpuShares: number;
	    NanoCpus: number;
	    CpuPeriod: number;
	    CpuQuota: number;
	    CpuRealtimePeriod: number;
	    CpuRealtimeRuntime: number;
	    CpuCount: number;
	    CpuPercent: number;
	
	    static createFrom(source: any = {}) {
	        return new HostConfig(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Dns = source["Dns"];
	        this.DnsOptions = source["DnsOptions"];
	        this.DnsSearch = source["DnsSearch"];
	        this.CpuShares = source["CpuShares"];
	        this.NanoCpus = source["NanoCpus"];
	        this.CpuPeriod = source["CpuPeriod"];
	        this.CpuQuota = source["CpuQuota"];
	        this.CpuRealtimePeriod = source["CpuRealtimePeriod"];
	        this.CpuRealtimeRuntime = source["CpuRealtimeRuntime"];
	        this.CpuCount = source["CpuCount"];
	        this.CpuPercent = source["CpuPercent"];
	    }
	}
	export class ContainerDetail {
	    Id: string;
	    Created: string;
	    Path: string;
	    Args: string[];
	    // Go type: types.ContainerState
	    State?: any;
	    Image: string;
	    ResolvConfPath: string;
	    HostnamePath: string;
	    HostsPath: string;
	    LogPath: string;
	    Name: string;
	    RestartCount: number;
	    Driver: string;
	    Platform: string;
	    MountLabel: string;
	    ProcessLabel: string;
	    AppArmorProfile: string;
	    ExecIDs: string[];
	    HostConfig?: HostConfig;
	    GraphDriver: types.GraphDriverData;
	    SizeRw?: number;
	    SideRootFs?: number;
	
	    static createFrom(source: any = {}) {
	        return new ContainerDetail(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Created = source["Created"];
	        this.Path = source["Path"];
	        this.Args = source["Args"];
	        this.State = this.convertValues(source["State"], null);
	        this.Image = source["Image"];
	        this.ResolvConfPath = source["ResolvConfPath"];
	        this.HostnamePath = source["HostnamePath"];
	        this.HostsPath = source["HostsPath"];
	        this.LogPath = source["LogPath"];
	        this.Name = source["Name"];
	        this.RestartCount = source["RestartCount"];
	        this.Driver = source["Driver"];
	        this.Platform = source["Platform"];
	        this.MountLabel = source["MountLabel"];
	        this.ProcessLabel = source["ProcessLabel"];
	        this.AppArmorProfile = source["AppArmorProfile"];
	        this.ExecIDs = source["ExecIDs"];
	        this.HostConfig = this.convertValues(source["HostConfig"], HostConfig);
	        this.GraphDriver = this.convertValues(source["GraphDriver"], types.GraphDriverData);
	        this.SizeRw = source["SizeRw"];
	        this.SideRootFs = source["SideRootFs"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace image {
	
	export class ImageDetail {
	    Id: string;
	    RepoTags: string[];
	    RepoDigests: string[];
	    Parent: string;
	    Comment: string;
	    Created: string;
	    Container: string;
	    // Go type: container.Config
	    ContainerConfig?: any;
	    DockerVersion: string;
	    Author: string;
	    // Go type: container.Config
	    Config?: any;
	    Architecture: string;
	    Variant?: string;
	    Os: string;
	    OsVersion?: string;
	    Size: number;
	    VirtualSize: number;
	
	    static createFrom(source: any = {}) {
	        return new ImageDetail(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.RepoTags = source["RepoTags"];
	        this.RepoDigests = source["RepoDigests"];
	        this.Parent = source["Parent"];
	        this.Comment = source["Comment"];
	        this.Created = source["Created"];
	        this.Container = source["Container"];
	        this.ContainerConfig = this.convertValues(source["ContainerConfig"], null);
	        this.DockerVersion = source["DockerVersion"];
	        this.Author = source["Author"];
	        this.Config = this.convertValues(source["Config"], null);
	        this.Architecture = source["Architecture"];
	        this.Variant = source["Variant"];
	        this.Os = source["Os"];
	        this.OsVersion = source["OsVersion"];
	        this.Size = source["Size"];
	        this.VirtualSize = source["VirtualSize"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace settings {
	
	export class Settings {
	    socket: string;
	
	    static createFrom(source: any = {}) {
	        return new Settings(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.socket = source["socket"];
	    }
	}

}

export namespace types {
	
	export class GraphDriverData {
	    Data: {[key: string]: string};
	    Name: string;
	
	    static createFrom(source: any = {}) {
	        return new GraphDriverData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Data = source["Data"];
	        this.Name = source["Name"];
	    }
	}
	export class ImageSummary {
	    Containers: number;
	    Created: number;
	    Id: string;
	    Labels: {[key: string]: string};
	    ParentId: string;
	    RepoDigests: string[];
	    RepoTags: string[];
	    SharedSize: number;
	    Size: number;
	    VirtualSize: number;
	
	    static createFrom(source: any = {}) {
	        return new ImageSummary(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Containers = source["Containers"];
	        this.Created = source["Created"];
	        this.Id = source["Id"];
	        this.Labels = source["Labels"];
	        this.ParentId = source["ParentId"];
	        this.RepoDigests = source["RepoDigests"];
	        this.RepoTags = source["RepoTags"];
	        this.SharedSize = source["SharedSize"];
	        this.Size = source["Size"];
	        this.VirtualSize = source["VirtualSize"];
	    }
	}
	export class Port {
	    IP?: string;
	    PrivatePort: number;
	    PublicPort?: number;
	    Type: string;
	
	    static createFrom(source: any = {}) {
	        return new Port(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.IP = source["IP"];
	        this.PrivatePort = source["PrivatePort"];
	        this.PublicPort = source["PublicPort"];
	        this.Type = source["Type"];
	    }
	}

}

