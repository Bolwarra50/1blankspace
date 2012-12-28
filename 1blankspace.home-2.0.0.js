/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */

ns1blankspace.xhtml.defaultElementID = 'ns1blankspaceControlActionToday';

ns1blankspace.home = 
{
	init: 		function () {ns1blankspace.home.show()},

	show: 		function ()
				{	
					if (ns1blankspace.setupView)
					{	
						$('#ns1blankspaceViewControlSetup').attr('checked', false);
						$('#ns1blankspaceViewControlSetup').button('refresh');
						ns1blankspace.setup.switch({viewScript: 'ns1blankspace.home.show()'});
					}	

					$('#ns1blankspaceViewControlAction').button({disabled: true});
					$('#ns1blankspaceViewControlNew').button({disabled: true});
					$('#ns1blankspaceViewControlActionOptions').button({disabled: true});

					$('#ns1blankspaceViewControlViewContainer').button(
						{
							label: 'Select...'
						});

					var aHTML = [];
					
					aHTML.push('<table id="ns1blankspaceHomeContainer">');
					
					aHTML.push('<tr><td><div id="ns1blankspaceViewActionLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');
						
					aHTML.push('<tr class="ns1blankspaceControl">' +
									'<td id="ns1blankspaceControlActionToday" class="ns1blankspaceControl ns1blankspaceControlHome">' +
										'Today</td>' +
									'</tr>');

					aHTML.push('<tr class="ns1blankspaceControl">' +
									'<td id="ns1blankspaceControlActionTomorrow" class="ns1blankspaceControl ns1blankspaceControlHome">' +
										'Tomorrow</td>' +
									'</tr>');
					
					aHTML.push('<tr><td>&nbsp;</td></tr>');
						
					aHTML.push('<tr class="ns1blankspaceControl">' +
									'<td id="ns1blankspaceControlActionFuture" class="ns1blankspaceControl ns1blankspaceControlHome">' +
										'Future</td>' +
									'</tr>');
					
					aHTML.push('<tr id="trns1blankspaceViewportControl1" class="ns1blankspaceViewportControl">' +
									'<td id="ns1blankspaceControlActionOverdue" class="ns1blankspaceControl ns1blankspaceControlHome">' +
										'Overdue</td>' +
									'</tr>');
									
					aHTML.push('</table>');					
							
					$('#ns1blankspaceControl').html(aHTML.join(''));
					
					this.bind();

					var aHTML = [];
					
					aHTML.push('<table id="ns1blankspaceHomeContainer">');
					aHTML.push('<tr><td id="ns1blankspaceHomeColumn1" class="ns1blankspaceColumn1Flexible"></td>');
					aHTML.push('<td id="ns1blankspaceHomeColumn2" class="ns1blankspaceColumn2" style="width:300px;">');
					aHTML.push('</td></tr></table>');	

					$('#ns1blankspaceMain').html(aHTML.join(''));

					$('#ns1blankspaceHomeColumn2').html(ns1blankspace.xhtml.homeNotes);

					if (ns1blankspace.xhtml.defaultElementID != '')
					{
						$('#' + ns1blankspace.xhtml.defaultElementID).addClass('ns1blankspaceHighlight');
						$('#' + ns1blankspace.xhtml.defaultElementID).click();
					};
				},

	bind: 		function ()
				{
					
					$('#ns1blankspaceControlActionToday').click(function(event)
					{
						$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
						ns1blankspace.xhtml.defaultElementID = this.id;
						
						ns1blankspace.home.actions.show({
							show: false,
							xhtmlElementID: 'ns1blankspaceHomeColumn1',
							day: 0
							})
					});

					$('#ns1blankspaceControlActionTomorrow').click(function(event)
					{
						$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
						ns1blankspace.xhtml.defaultElementID = this.id;
						
						ns1blankspace.home.actions.show({
							show: false,
							xhtmlElementID: 'ns1blankspaceHomeColumn1',
							day: 1
							})
					});
					
					$('#ns1blankspaceControlActionFuture').click(function(event)
					{
						$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
						ns1blankspace.xhtml.defaultElementID = this.id;
						
						ns1blankspace.home.actions.show({
							show: false,
							xhtmlElementID: 'ns1blankspaceHomeColumn1',
							future: true
							})
					});

					$('#ns1blankspaceControlActionOverdue').click(function(event)
					{
						$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
						ns1blankspace.xhtml.defaultElementID = this.id;
						
						ns1blankspace.home.actions.show({
							show: false,
							xhtmlElementID: 'ns1blankspaceHomeColumn1',
							overdue: true
							})
					});
				}
}	

ns1blankspace.home.options = 
{
	show: 		function ()
				{
					var aHTML = [];
					
					aHTML.push('<table id="ns1blankspaceHomeOptions" class="ns1blankspaceContainer">');
						
					if (gbRoleBase)
					{
						aHTML.push('<tr><td id="ns1blankspaceHomeOptionsMyStartPage" class="ns1blankspace">' +
											'<a href="/index.asp?Site=475&p=asms%2Fmystartpage.asp" target="_blank">' +
											'My Start Page (Classic)</a></td></tr>');
									
						aHTML.push('<tr"><td id="ns1blankspaceHomeOptionsCalendar" class="ns1blankspace">' +
											'Calendar</td></tr>');
					};
					
					aHTML.push('</table>');
						
					if ($(ns1blankspace.xhtml.container).attr('data-initiator') == oElement.id)
					{
						$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
						$(ns1blankspace.xhtml.container).attr('data-initiator', '');
					}
					else
					{	
						$(ns1blankspace.xhtml.container).attr('data-initiator', oElement.id);
						$(ns1blankspace.xhtml.container).html("&nbsp;");
						$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
						$(ns1blankspace.xhtml.container).offset({ top: $(oElement).offset().top + $(oElement).height(), left: $(oElement).offset().left });
						$(ns1blankspace.xhtml.container).html(aHTML.join(''));
						ns1blankspace.home.options.bind();
					}
				},

	bind:		function ()
				{
					$('#ns1blankspaceHomeOptionsCalendar').click(function(event)
					{
						ns1blankspace.action.init({calendar: true});
					});
				}
}				

ns1blankspace.home.actions = 
{
	show: 		function (oParam, oResponse)
				{					
					var bShow = false;
					var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
					var iDay = 0;
					var sLabel = 'Actions';
					var bOverdue = false;
					var bFuture = false;
					
					if (oParam != undefined)
					{
						if (oParam.show != undefined) {bShow = oParam.show}
						if (oParam.overdue != undefined) {bOverdue = oParam.overdue}
						if (oParam.future != undefined) {bFuture = oParam.future}
						if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
						if (oParam.day != undefined) {iDay = oParam.day}
						if (oParam.label != undefined) {sLabel = oParam.label}
					}

					var aHTML = [];
					
					if (oResponse == undefined)
					{						
						var sData = 'diary=1&actionby=' + ns1blankspace.util.fs(ns1blankspace.user);
						sData += '&rows=10';
						
						if (bOverdue)
						{
							sData += '&past=1&status=2-4';
						}
						else if (bFuture)
						{
							sData += '&future=1&status=2-4';
						}
						else
						{
							sData += '&day=' + iDay;
						}	
						
						$.ajax(
						{
							type: 'POST',
							url: '/ondemand/action/?method=ACTION_SEARCH',
							data: sData,
							dataType: 'json',
							success: function(data) {ns1blankspace.home.actions.show(oParam, data)}
						});
					}
					else
					{
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table class="ns1blankspaceHomeActions">');
							aHTML.push('<tr><td class="ns1blankspaceNothing">No ' + sLabel + '</td></tr>');
							aHTML.push('</table>');

							$('#' + sXHTMLElementID).html(aHTML.join(''));
							if (bShow) {$('#' + sXHTMLElementID).show(ns1blankspace.option.showSpeedOptions)}	
						}
						else
						{
							if (bShow)
							{
								aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');

								aHTML.push('<tr><td class="ns1blankspaceCaption">' + sLabel + '</td>' + 
												'<td id="ns1blankspaceHomeTodayActions" class="ns1blankspaceHomeOptionClose">Close</td>' +
												'</tr></table>');
								
								aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');
							}
							else
							{
								aHTML.push('<table id="s1blankspaceHomeActions' + iDay + '" class="ns1blankspace">');
							}	
							
							aHTML.push('<tr class="ns1blankspaceCaption">');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">Subject</td>');
							
							if (bOverdue || bFuture)
							{
								aHTML.push('<td class="ns1blankspaceHeaderCaption">Date</td>');
							}
							
							aHTML.push('<td class="ns1blankspaceHeaderCaption">Time</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">Contact</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
							aHTML.push('</tr>');

							$.each(oResponse.data.rows, function()
							{
								aHTML.push(ns1blankspace.home.actions.row(this, (bOverdue || bFuture)));
							});
							
							aHTML.push('</table>');

							if (bShow) {$('#' + sXHTMLElementId).show(ns1blankspace.option.showSpeedOptions)}	
							
							ns1blankspace.render.page.show(
							{
								xhtmlElementID: sXHTMLElementID,
								xhtmlContext: 'HomeTodayAction',
								xhtml: aHTML.join(''),
								showMore: (oResponse.morerows == 'true'),
								more: oResponse.moreid,
								rows: 10,
								functionShowRow: ns1blankspace.home.actions.row(this, (bOverdue || bFuture)),
								functionNewPage: 'ns1blankspace.home.actions.bind()',
								type: 'json'
							}); 	
							
							ns1blankspace.home.actions.bind();
						}
					}
				},

	row:		function (oRow, bShowDate)
				{
					var aHTML = [];
		
					aHTML.push('<tr class="ns1blankspaceRow">');
								
					aHTML.push('<td id="ns1blankspaceHomeActions_subject-' + oRow.id + '" class="ns1blankspaceRow">' +
											oRow.subject + '</td>');
						
					var oDate = new Date.parse(ns1blankspace.objectContextData.actiondatetime);
					sDate = oDate.toString("ddd, dd MMM yyyy h:mm TT");
							
					if (bShowDate)
					{
						aHTML.push('<td id="ns1blankspaceHomeActions_date-' + oRow.id + '" class="ns1blankspaceRow">' +
											sDate + '</td>');
					}
					
					if (oDate.getHours() != 0 || Date.getMinutes() != '0')
					{
						sDate = oDate.toString("h:mm TT");
					}
					else
					{
						sDate = '&nbsp;';
					}	
											
					aHTML.push('<td id="ns1blankspaceHomeActions_time-' + oRow.id + '" class="ns1blankspaceMainRow ns1blankspaceRowSelect">' +
											sDate + '</td>');
											
					aHTML.push('<td id="ns1blankspaceHomeActions_contact-' + oRow.contactperson + '" class="ns1blankspaceMainRow ns1blankspaceRowContact">' +
											oRow.contactpersonfirstname + ' ' + 
											oRow.contactpersonsurname + '</td>');
					
					aHTML.push('<td id="ns1blankspaceHomeActions-' + oRow.id + '" class="ns1blankspaceMainRow" style="width:65px;">');
					
					aHTML.push('<span id="ns1blankspaceHomeActions_cancel-' + oRow.id + '" class="ns1blankspaceRowCancel"></span>');
					aHTML.push('<span id="ns1blankspaceHomeActions_complete-' + oRow.id + '" class="ns1blankspaceRowComplete"></span>');
					aHTML.push('<span id="ns1blankspaceHomeActions-' + oRow.id + '" class="ns1blankspaceRowSelect"></span>');
					
					aHTML.push('</td></tr>');
					
					return aHTML.join('');
				},
					
	bind:		function ()	
				{

					$('#ns1blankspaceHomeActions td.ns1blankspaceRowContact').click(function() {
						ns1blankspace.contactPerson.init();
						ns1blankspace.contactPerson.searchsend(this.id);
					})

					$('#ns1blankspaceHomeActions .ns1blankspaceMainRowOptionsSelect').button( {
						text: false,
						icons: {
							primary: "ui-icon-play"
						}
					})
					.click(function()
					{
						ns1blankspace.action.init();
						ns1blankspace.action.searchsend(this.id)
					})
					.css('width', '15px')
					.css('height', '18px');

					$('#ns1blankspaceHomeActions .ns1blankspaceMainRowOptionsCancel').button({
						text: false,
						label: "Cancel",
						icons: {
							 primary: "ui-icon-close"
						}
					})
					.click(function() {
						ns1blankspace.home.actions.status(this.id, 3)
					})
					.css('width', '15px')
					.css('height', '18px')
						
						
					$('#ns1blankspaceHomeActions .ns1blankspaceMainRowOptionsComplete').button({
						text: false,
						label: "Complete",
						icons: {
							 primary: "ui-icon-check"
						}
					})
					.click(function() {
						ns1blankspace.home.actions.status(this.id, 1)
					})
					.css('width', '15px')
					.css('height', '18px');
				},

	status:		function (sXHTMLElementID, iStatus)
				{
					var sData = '';
					
					if (iStatus == undefined) {iStatus = 1}
					
					if (sXHTMLElementID != undefined)
					{
						aXHTMLElementID = sXHTMLElementID.split('-');
						
						if (aXHTMLElementID[1] != undefined)
						{
							sData += 'id=' + s1blankspace.util.fs(aXHTMLElementID[1]);
							sData += '&status=' + ns1blankspace.util.fs(iStatus);
							
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('ACTION_MANAGE'),
								data: sData,
								dataType: 'json',
								success: function(data){$('#' + sXHTMLElementID).parent().parent().fadeOut(500)}
							});
						}
					}	
				}				
}