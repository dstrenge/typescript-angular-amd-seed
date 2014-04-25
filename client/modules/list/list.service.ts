/// <amd-dependency path="angular" />
/// <amd-dependency path="angular-resource" />

export interface IListItem extends ng.resource.IResource<IListItem> {
	id: string;
	text: string;
}

export interface IListItemResource extends ng.resource.IResourceClass<IListItem> {
}

export var ListService: any = [
	"$resource",
	($resource : ng.resource.IResourceService) : IListItemResource => {
	return <IListItemResource> $resource("/SampleServer/api/list/:id", { id: "@id" }, { });
}];
