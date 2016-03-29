var context = require.context('./test/unit', true, /.+(Spec|\.unit)\.tsx?$/);
context.keys().forEach(context);
