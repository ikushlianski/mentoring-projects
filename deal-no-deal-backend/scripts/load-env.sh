cp .env .env.exported

(sed -E -n 's/[^#]+/export &/ p' .env) > .env.exported

source .env.exported

