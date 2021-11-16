import { typeDef } from './typeDef';
import { queryResolvers, mutationResolvers } from './resolvers';


const register = (schemaDef) => {
    schemaDef.typeDefs = [
        ...schemaDef.typeDefs,
        typeDef
    ];
    schemaDef.queryResolvers = {
        ...schemaDef.queryResolvers,
        ...queryResolvers
    };
    schemaDef.mutationResolvers = {
        ...schemaDef.mutationResolvers,
        ...mutationResolvers
    };
}


export {
    register
};
