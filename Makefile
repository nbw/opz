build_opz:
	js-yaml opz.yml > lib/opz.json

install: install_js_yaml

install_js_yaml:
	npm install -g js-yaml
