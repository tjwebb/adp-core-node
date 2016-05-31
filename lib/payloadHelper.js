/*
Copyright © 2015-2016 ADP, LLC.

Licensed under the Apache License, Version 2.0 (the “License”);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
express or implied.  See the License for the specific language
governing permissions and limitations under the License.
*/

'use strict';

var defaultPayload = require('./defaultPayload');

function removeUnusedProperties(payload) {
	var event = payload.events[0];
	delete payload.meta;
	delete payload.confirmMessage;
	delete event.eventID;
	delete event.eventTitle;
	delete event.eventSubTitle;
	delete event.eventReasonCode;
	delete event.eventStatusCode;
	delete event.priorityCode;
	delete event.recordDateTime;
	delete event.creationDateTime;
	delete event.effectiveDateTime;
	delete event.expirationDateTime;
	delete event.dueDateTime;
	delete event.originator;
	delete event.actor;
	delete event.actAsParty;
	delete event.onBehalfOfParty;
	delete event.links;
	delete event.data.output;
	delete event.data.eventContext.contextExpressionID;
	delete event.data.transform.eventReasonCode;
	delete event.data.transform.eventStatusCode;
	delete event.data.transform.effectiveDateTime;

	return payload;
}

function removeUnusedDefaultedProperties(payload) {
	function removeProps(obj) {
		var deleteVals = ['DELETE_STRING', 'DELETE_NUMBER', 'DELETE_BOOLEAN'];
		Object.keys(obj).forEach(function keysForEachCb(key) {
			if(obj[key] === null || ~deleteVals.indexOf(obj[key])) {
				delete obj[key];
				removeProps(obj);
			}
			if(obj[key] && Object.keys(obj[key]).length === 0) {
				delete obj[key];
				removeProps(obj);
			}
			if(typeof obj[key] === 'object' && obj[key] !== null && Object.keys(obj[key]).length > 0) {
				removeProps(obj[key]);
			}
		});
	}
	removeProps(payload);
	return payload;
}

module.exports = {
	removeUnusedProperties: removeUnusedProperties,
	defaultPayload: defaultPayload,
	removeUnusedDefaultedProperties: removeUnusedDefaultedProperties
};