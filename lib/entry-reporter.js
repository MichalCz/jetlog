const {inspect} = require("util");

/**
 * @param {DataStream} log
 */
module.exports = (log) => {
    return log.stringify(
        /**
         *
         * @param {Entry} entry
         */
        ({ts, msg, level, origin, stack, extra}) => {
            const trimmedMessage = msg.trim();
            const nlIndex = trimmedMessage.indexOf("\n");
            const firstLine = nlIndex > 0 ? trimmedMessage.substr(0, nlIndex) : trimmedMessage;
            const levelName = log.constructor.levels[level];

            origin = origin && origin[Symbol.toStringTag] || origin.toString();
            const stackString = stack ? ` ${stack.getFileName()}:${stack.getLineNumber()}` : "";
            const functionString = stack ? ` ${stack.getFunctionName()}` : "";
            const methodString = stack && stack.getMethodName() ? ` ${stack.getTypeName()}..${stack.getMethodName()}` : "";

            let extraLines = "";
            if (nlIndex > 0) {
                extraLines += trimmedMessage.substr(nlIndex)
                    .split("\n")
                    .map(x => "    "+x)
                    .join("\n");
            }
            if (extra) {
                const extraString = inspect(extra);
                extraLines += "\n" + extraString.substr(nlIndex)
                    .split("\n")
                    .map(x => "    "+x)
                    .join("\n");
            }

            return `${ts.toISOString()} [${levelName}] (${origin}${stackString}${methodString || functionString}) ${firstLine}${extraLines}`;
        }
    );
};
