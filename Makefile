
all:
	cat lib/base/logger.js \
	lib/base/browser.js \
	lib/base/buttons.js \
	lib/spreadsheet/base26.js \
	lib/spreadsheet/cell.js \
	lib/spreadsheet/range.js \
	lib/spreadsheet/sheet.js \
	lib/spreadsheet/spreadsheet.js \
	lib/spreadsheet/spreadsheet_app.js \
	lib/url_fetch/http_response.js \
	lib/url_fetch/o_auth_config.js \
	lib/url_fetch/url_fetch_app.js \
	lib/utilities/mac_algorithm.js \
	lib/utilities/utilities.js \
	lib/xml/xml.js \
	lib/xml/xml_element.js \
	> out/methane.js

