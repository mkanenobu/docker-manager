export namespace docker {
	
	export class Container {
	    Id: string;
	    Names: string[];
	    Image: string;
	    ImageID: string;
	    Command: string;
	    Created: number;
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
	        this.State = source["State"];
	        this.Status = source["Status"];
	    }
	}

}

