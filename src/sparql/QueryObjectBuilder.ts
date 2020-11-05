import rdfNamespaces from '@/sparql/rdfNamespaces';
import QueryRepresentation from '@/sparql/QueryRepresentation';
import { SelectQuery } from 'sparqljs';

export default class QueryObjectBuilder {
	private queryObject: SelectQuery;

	public constructor() {
		this.queryObject = {
			queryType: 'SELECT',
			variables: [],
			where: [],
			type: 'query',
			prefixes: rdfNamespaces,
		};
	}

	public buildFromQueryRepresentation( queryRepresentation: QueryRepresentation ): SelectQuery {

		this.queryObject.variables = [
			{
				termType: 'Variable',
				value: 'item',
			},
		];
		this.queryObject.where = [
			{
				type: 'bgp',
				triples: [
					{
						subject: {
							termType: 'Variable',
							value: 'item',
						},
						predicate: {
							termType: 'NamedNode',
							value: rdfNamespaces.wdt + queryRepresentation.condition.propertyId,
						},
						object: {
							termType: 'Literal',
							value: queryRepresentation.condition.value,
						},
					},
				],
			},
		];

		return this.queryObject;
	}
}