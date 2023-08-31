import React, { useEffect,useState } from "react";
import Grid from "@mui/material/Grid";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import contract from "../../../src/assets/contract.jpg";
import { useDispatch, useSelector } from "react-redux";
import ContractHistory from "../ContractHistory/ContractHistory";
import moment from "moment";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'subscript',
    'superscript',
    'bulletedList',
    'numberedList',
    'alignment',
    'todoList',
    'mediaEmbed',
    'indent',
    'outdent',
    'link',
    'imageUpload',
    'insertTable',
    'blockQuote',
    'undo',
    'redo'
  ]
};
const ContractPreview = (props) => {
  const { contract, contract_length } = props;
  const artist = useSelector((state) => state.artist.artist);
  const user = useSelector((state) => state.auth.user);
  const selected = useSelector((state) => state.artist.selectedTracks);
  const tracks = useSelector((state) => state.artist.tracks);

  const [docxData, SetdocxData] = useState([])


  const todayDate = moment().format("MMM-DD-YYYY");
  const tableData = docxData.map((track) => {
      return `
      <tr>
        <td style="border: 1px solid black;">${track.isrc}</td>
        <td style="border: 1px solid black;">${track.title}</td>
        <td style="border: 1px solid black;">${track.stream_income_share}</td>
      </tr>
    `;
    })
    .join("");
  const setdata = `<div className="exportContent" id="exportContent">
  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:center;'><strong><span style='font-size:12px;font-family:"Times New Roman",serif;'>DISTRIBUTION AGREEMENT</span></strong></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">This DISTRIBUTION AGREEMENT (the &lsquo;<strong>Agreement</strong>&rsquo;) made and entered into as of ${todayDate} (the &lsquo;<strong>Effective Date</strong>&rsquo;), by and between Create Music Group, Inc., with offices at 1320 N. Wilton Pl, Los Angeles, CA 90028 (&lsquo;<strong>Licensee</strong>&rsquo; or &lsquo;<strong>Create Music Group</strong>&rsquo;) -and ${contract?.legel_name}  with an address <span style="color:#00000A;">at ${contract?.recipient_address}, ${contract.city} , ${contract.zip_code}&nbsp;${contract.country} </span>(&lsquo;<strong>Licensor</strong>&rsquo; or &lsquo;<strong>you</strong>&rsquo;) for the licensing of certain Master Recording(s) (as defined herein), as recorded by the recording artist ${contract?.artist_name} ( <strong>Artist</strong> ) .</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">In consideration of the mutual promises and covenants herein contained including, without limitation, all promises and covenants contained in Exhibit A and Exhibit B attached hereto and incorporated herein by this reference, the parties hereby agree as follows:</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">1. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Term &amp; Collection Period</u>.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:62px;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:9.0pt;;">The term of this Agreement (the Term) shall commence upon the Effective Date (</span><span style="font-family:Times;font-size:9.0pt;">${todayDate}</span><span style="font-family:Times;font-size:9.0pt;color:#00000A;background:white;">)</span><span style="font-family:Times;font-size:12px;">&nbsp;and shall continue for <span style="color:#00000A;background:white;">(${props.contract_length}) year</span> following the initial commercial release date of each recording covered by this agreement. Notwithstanding the above, the term of the contract may be extended, despite the notice of termination being rendered by, and over the objection of, Licensor, subject to the provisions of Section 6, paragraph c below. The Agreement shall automatically renew for successive and consecutive <span style="color:#00000A;background:white;">one (1) year&nbsp;</span>periods until terminated by either party by either party providing notice to the other at least 60 days prior to the end of the applicable initial Term or renewal period.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;text-indent:36.0pt;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;font-family:Times;">(b)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;The &lsquo;<strong>Collection Period</strong>&rsquo; (as used herein) shall mean the period commencing upon the expiration or termination of the Term and continuing for one (1) year.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">2. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Delivery, Promotional and Clearance Obligations of Licensor</u>.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(a)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Licensor will not &lsquo;sample&rsquo; or otherwise incorporate into the Master Recording(s) (&lsquo;<strong>Sample</strong>&rsquo; or &lsquo;<strong>Sampling</strong>&rsquo;) any copyrighted or otherwise proprietary material (including, without limitation, copyrighted master recordings and musical compositions) owned, composed and/or controlled by any third person or entity without having first obtained Licensee&rsquo;s prior written approval of such Sample. &nbsp;The inclusion of any Samples in the Master Recording(s) shall be subject to both Licensee&rsquo;s approval of the terms of the applicable clearance agreement for such Sample and the full execution of such clearance agreement. &nbsp;&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(b)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Licensor shall be solely responsible for clearing the use of all third-party materials used in the Master Recording(s) and promotional materials (including musical compositions). Upon Licensee&rsquo;s request, Licensor shall provide copies of its licenses of such third-party materials. &nbsp;Licensor hereby warrants and represents that all information supplied by Licensor to Licensee in that regard is and shall be complete and correct. &nbsp;Without limiting the foregoing, no Master Recording(s) will be scheduled for release until a written license for the use of each such Sample in any and all media has been obtained by Licensor, at Licensor or Artist&rsquo;s sole expense, and approved by Licensee.&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:black;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(c)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;During the Term, Licensor shall&nbsp;<strong>exclusively&nbsp;</strong>deliver to Licensee the following studio master recordings (the &ldquo;Master Recordings&rdquo;) embodying musical compositions (the &nbsp;&ldquo;Compositions&rdquo;) that are satisfactory and acceptable to Licensee in its sole discretion:</span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:black;">&nbsp;</span></p>
<ol style="list-style-type: undefined;margin-left:98px;">
  <li><span style="font-family:Times;color:black;font-size:12px;color:black;">any and all Master Recordings&nbsp;</span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-family:Times;font-size:12px;">listed on Schedule A;&nbsp;</span></span></li>
  <li><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-family:Times;font-size:12px;">any other Master Recordings delivered by Licensor to Licensee during the Term in Licensor&rsquo;s sole and absolute&nbsp;</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-family:Times;">discretion</span></span><span style="font-family:Times;color:black;">&nbsp;</span></li>
  <li><em><span style="font-family:Times;color:black;font-size:12px;color:black;">Intentionally Deleted.</span></em><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-family:Times;">&nbsp;</span></span></li>
  <li><span style='font-family:"Times New Roman",serif;color:windowtext;'><em><span style="font-family:Times;">Intentionally deleted.</span></em></span></li>
</ol>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;line-height:115%;font-family:Times;">(d)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<em>Intentionally Deleted.</em></span></span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;line-height:115%;font-family:Times;">(e)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<em>Intentionally Deleted.</em></span></span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;border:none;'><span style="font-size:12px;font-family:Times;color:#1D1C1D;background:#F8F8F8;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">3. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Rights Granted</u>.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(a)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Licensor grants Licensee (together with its affiliates, vendors and third distribution partners) the Exclusive right and license during the Term and throughout the world and Universe (&lsquo;<strong>Territory</strong>&rsquo;) to: distribute, transmit, make derivative works from (including, without limitation, to transcode and stream audio-only files and to create promotional materials), publicly perform and exhibit, and otherwise promote and exploit the Master Recording(s)</span><span style="font-size:12px;font-family:Times;">&nbsp;via vinyl record, compact disc, Internet, mobile, streaming, and any media now known or hereafter devised. The format and timing of commercial release of the Master Recordings shall be determined by Licensee in its sole discretion.&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(b)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;During the Term, Licensee shall be Licensor&rsquo;s Exclusive distributor of the Master Recording(s), except as it pertains to synchronization licensing which shall be non-exclusive; accordingly, Licensor grants Licensee the non-exclusive right and license during the Term and within the Territory to issue synchronization licenses for the Master Recording(s).&nbsp;</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:36.0pt;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;font-family:Times;">(c) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;Licensor grants to Licensee the exclusive right and license, during the Term and Collection Period, to collect all monies earned from exploitations of the Master Recording(s) that occur prior to or during the Term, specifically in connection with rights granted hereunder including, without limitation, neighboring rights income. For the avoidance of doubt, the foregoing exclusive right shall not apply: (i) in connection with synchronization licenses entered into directly by Licensee, or (ii) the so-called &lsquo;Artist&rsquo;s share&rsquo; of neighboring rights income (as opposed to the so-called &lsquo;master owner&rsquo;s share,&rsquo; which Licensor shall be entitled to collect), including, without limitation from SoundExchange. Licensee shall not have the right to collect any monies earned from exploitations of the Master Recording that occur after the expiration of the Term.</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:36.0pt;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;font-family:Times;">(d) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;Licensor grants to Licensee during the Term the exclusive<strong>&nbsp;</strong>right to use Artist&rsquo;s name and likeness in connection with the exploitation of the Master Recordings.&nbsp;</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:44px;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-family:Times;font-size:12px;">&nbsp;Licensor grants to Licensee all of the rights provided in Exhibit A and Exhibit B attached hereto and incorporated herein by this reference and hereby agrees to be bound by all covenants and obligations contained therein.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">3B.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span style='font-family:"Times New Roman",serif;color:windowtext;'><em><span style="font-size:12px;line-height:115%;font-family:Times;">Intentionally Deleted.</span></em></span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">3C.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<u>Pitching</u></span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><u><span style="font-size:12px;font-family:Times;">&nbsp;Rights</span></u></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><u><span style="font-size:12px;font-family:Times;">.</span></u></span><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">(a) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;During the Term, Licensor grants to Licensee, with respect to the Master Recordings and Artist and/or Licensor&rsquo;s pro-rata ownership interest in and to the underlying Compositions, the&nbsp;</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">Exclusive&nbsp;</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">right to pitch, secure, negotiate, enter into and administer synchronization, master use, and other related licenses (and collect all related monies) for the Master Recordings and/or Compositions for exploitation in all areas of audio-only and audiovisual broadcast media, including without limitation, soundtracks, all forms of TV (including free TV, cable of all types, satellite, direct broadcast and any other types of&nbsp;</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;"> </span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">television</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;"> </span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">), advertising, home video, video games, the internet, and mobile (collectively&nbsp;</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;"> </span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><strong><span style="font-size:12px;font-family:Times;">P</span></strong></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><strong><span style="font-size:12px;font-family:Times;">itching</span></strong></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><strong><span style="font-size:12px;font-family:Times;">&nbsp;Rights</span></strong></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;"> </span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">). Licensee&rsquo;s rights to collect monies shall include the right to collect any sums for extensions</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">and/or replacements of any applicable licenses, option fees, advances, and royalties (excluding, residuals, SAG and AFTRA monies, if any).&nbsp;Licensee shall have the right to advertise and publicize itself as Artist&rsquo;s and/or Licensor&rsquo;s licensing agent in connection with the Master Recordings and/or Compositions, and Licensee may include Artist&rsquo;s and/or Licensor&rsquo;s name, approved likeness, approved biographical material in mailings and promotional materials, if any.</span></span><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;"><br></br>&nbsp;(b) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Notwithstanding anything to the contrary contained herein and for the avoidance of doubt:</span></span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;text-indent:36.0pt;'><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;text-indent:36.0pt;'><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">(i)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">P</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">itching</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">&nbsp;Rights refers solely to the right to procure and administer licenses for the Master Recordings and/or Compositions, and Licensee is granted no rights (including, without limitation, ownership rights) in and to Artist&rsquo;s and/or Licensor&rsquo;s pro-rata interest in and to the Master Recordings and/or Compositions, other than P</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">itching</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">&nbsp;Rights granted pursuant to this agreement; and</span></span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;text-indent:36.0pt;'><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">(ii)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">the right of Licensee to administer and collect with respect to the licensed use of any Master Recording and/or Composition, shall be as set forth in the respective third-party license governing such use, and is separate and apart from the Term of this Agreement.</span></span><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;text-indent:36.0pt;'><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">(c) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;With respect to the P</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">itching</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">&nbsp;Rights, Licensee and/or Licensee&rsquo;s designee shall credit to Licensor</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></span><span style="font-size:12px;font-family:Times;background:white;">50</span><span style="font-size:12px;font-family:Times;">&nbsp;percent (50%)</span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">&nbsp; of&nbsp;</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">Pitching</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">&nbsp;Net Revenue (as defined below) deriving from licensing opportunities presented and/or secured by Licensee and/or Licensee&rsquo;s designee.&nbsp;</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;"> </span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><strong><span style="font-size:12px;font-family:Times;">P</span></strong></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><strong><span style="font-size:12px;font-family:Times;">itching</span></strong></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><strong><span style="font-size:12px;font-family:Times;">&nbsp;Net Revenue</span></strong></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;"> </span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">&nbsp;means all revenues actually received by Licensee in connection with the P</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">itching</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">&nbsp;Rights (excluding, for the avoidance of doubt, any sums paid to, or retained by, a collective rights organization, arm&rsquo;s length trustee, or an agent for the licensing of the Compositions) (</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;"> </span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><strong><span style="font-size:12px;font-family:Times;">Gross Sums</span></strong></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;"> </span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">), less actual, third-party out-of-pocket costs incurred by Licensee in connection with the&nbsp;</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">Pitching</span></span><span style='font-family:"Times New Roman",serif;color:windowtext;'><span style="font-size:12px;font-family:Times;">&nbsp;Rights.</span></span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">4. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<u>Revenue Share</u>.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(a)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Licensee shall pay Licensor (or credit to Licensor&rsquo;s account, as applicable) the following percentages of Net Revenue. &lsquo;<strong>Net Revenue</strong>&rsquo; as used herein shall mean gross revenue actually received by Licensee pursuant to this Agreement, less any and all of Licensee&rsquo;s direct, non-overhead, unreimbursed costs and expenses which are directly attributable the rights granted hereunder including, without limitation, costs related to manufacturing, all related commissions and royalties payable by Licensee to any third parties (including without limitation, collection societies and agents (e.g., for the securing of placements)), studio costs, recording costs, design, artwork, packaging, shipping, distribution, storage, insurance, collection costs, union fees, production costs, costs of advertising, marketing or promotion, third party merchant costs (e.g. credit card, PayPal, or currency conversion costs), professional fees attributable to the rights granted hereunder (e.g., legal or accounting) and any and all other monies reasonably spent in connection with the rights granted hereunder:</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<ol style="list-style-type: undefined;margin-left:62px;">
  <li><span style="font-size:9.0pt;;">Digital Phono Record Delivery (i.e., electronic downloads): 80%</span></li>
  <li><span style="font-size:9.0pt;;">Streaming through audio (e.g., Spotify) and audio-visual (e.g. YouTube) distributors<strong>:&nbsp;</strong>80%</span></li>
  <li><span style="font-size:9.0pt;;">Synchronization licenses:&nbsp;</span><span style="font-family:Times;font-size:9.0pt;">50</span><span style="font-family:Times;color:background1;background:white;">%</span></li>
</ol>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span style="font-size:12px;font-family:Times;background:white;">(iv)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<em>Intentionally deleted.</em></span><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span style="font-size:12px;font-family:Times;background:white;">(vi)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<em>Intentionally deleted.</em></span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;font-family:Times;">(vi)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;Any other Net Revenue, including without limitation, neighboring rights income: 80%</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(b)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span style="font-size:12px;line-height:115%;font-family:Times;">&ldquo;<strong>Recoupable Expenses</strong>&rdquo; as used herein shall mean any and all direct, non-overhead, unreimbursed costs and expenses paid by or on behalf of Licensee which are directly attributable to the rights granted hereunder, including, without limitations, costs related to manufacturing, packaging, shipping, storage, design, artwork, advertising, marketing, promotion, insurance, union fees, production costs, studio costs, recording costs, all related royalties payable by Licensee to any third parties (including, without limitation, third-party royalty participants such as producers, mixers, etc.), and any and all other monies reasonably spent by or on behalf of Licensee in connection with the rights granted hereunder or which Licensor asks or requests that Licensee pay on Licensor&rsquo;s behalf; provided that, for the avoidance of doubt, any and all Recoupable Expenses shall be deemed recoupable advances hereunder and shall be <span style="background:white;">recoupable from Licensor&rsquo;s share of Net Revenue and the Channel Partnership Royalties (all of which shall be  cross-collateralized ), as well as any monies payable by Licensee to Licensor in connection with any other executed agreements between the parties,&nbsp;</span>and shall not, for the avoidance of doubt, be deemed &ldquo;off the top&rdquo; expenses to be deducted from gross revenue in the calculation of Net Revenue hereunder.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">(c)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;For the avoidance of doubt, Licensor&rsquo;s revenue share above shall be inclusive of all mechanical royalties due in connection with the sales of the Master Recordings and Licensor shall remain solely responsible for securing all mechanical licenses and making all payments required thereunder, with respect to the Compositions embodied in Master Recording hereunder (other than for any In-House Talent (as defined below)). &nbsp;Further, for the avoidance of doubt, &nbsp;to the extent Licensee makes any payment(s) with respect to such mechanical licenses or mechanical royalties, such payments shall be deemed Recoupable Expenses hereunder.&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(d)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Notwithstanding the foregoing, Licensee may retain for its own account any and all revenue payable to any In-House Talent subject to the terms of Licensor&rsquo;s or Licensee&rsquo;s agreement with same. As used herein, &ldquo;<strong>In-House Talent</strong>&rdquo; shall mean any producer, artist, songwriter, mixer or other performer whose applicable rights are administered, owned, controlled or furnished by Licensee. &nbsp;For avoidance of doubt such withholding by Licensee shall include, by way of illustration, producer royalties, producer profit share, and/or mechanical royalties due to any In-House Talent that is a producer or songwriter.&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style="font-size:12px;line-height:115%;font-family:Times;">5. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<u>Accounting, and Audit Rights</u>.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(a)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Licensee shall, on a monthly basis within thirty (30) days after the end of each calendar month, (i) render a statement detailing the unit sales, Net Revenue, and adjustments and (ii) pay Licensor its share of Net Revenue hereunder, less any withholdings required by U.S. tax law. &nbsp;Licensee shall not be required to make the foregoing accounting if Licensor&rsquo;s share of Net Revenue for any given monthly period does not exceed one hundred dollars ($100). &nbsp;Licensee may make adjustments for chargebacks and refunds and shall have the right to maintain reasonable reserves against returns and other adjustments, and shall liquidate such reserves in accordance with its reasonable practices, but in no event shall Licensee be required to liquidate any reserve until the applicable distributor liquidates the corresponding reserve. &nbsp;Licensee shall have the absolute right in accounting to Licensor to rely upon the statements received by Licensee from applicable distributors and income sources and Licensee shall not be responsible in any manner for any error, omission or other inaccuracy of any such statement. &nbsp; Royalties for records sold for distribution outside of the United States of America shall be computed in the national currency in which License is paid by its Licensees and shall be paid to Licensor at the same rate of exchange at which Licensee is paid.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:-36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">(b)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Notwithstanding the foregoing, Licensee has no duty to pay Licensor its share of Net Revenue pursuant to this Agreement, until any recoupable advances paid to Licensor have been fully recouped. If Licensee pays any advances or mutually-approved expenses, fees or other payments to Licensor or on Licensor&rsquo;s behalf (such as, for example, any approved third party marketing, promotion or advertising costs) and any such monies paid by Licensee have not been fully recouped as of the date of Licensor&rsquo;s written notice requesting a termination of the Term, Licensee may extend the Term beyond the scheduled termination or expiration date through the last day of the calendar month in which all such costs and any other amounts due and owing to Licensee are fully recouped. No other forms of compensation shall be due to Licensor from Licensee for the rights granted herein, including but not limited to mechanical or public performance&nbsp;</span><span style="font-size:12px;line-height:115%;font-family:Times;">royalties.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">(c)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;All statements rendered by Licensee to Licensor pursuant to the above subparagraph 5(a) and all other accounts, shall be binding upon Licensor and not subject to any objection by Licensor for any reason unless specific objection in writing, stating the basis thereof, is given to Licensee within twelve (12) months from the date rendered. &nbsp;Licensor shall be foreclosed from maintaining any action, claim or proceeding against Licensee in any forum or tribunal with respect to any statement or accounting due hereunder unless such action, claim or proceeding is commenced against Licensee in a court of competent jurisdiction within two (2) years after the date such statement or accounting is rendered; after such date such statement shall be binding. If Licensor commences suit on any controversy or claim concerning Net Revenue accountings rendered to Licensor under this Agreement in a court of competent jurisdiction, the scope of the proceeding will be limited to determination of the amount of the Net Revenue due for the accounting periods concerned, and the court will have no authority to consider any other issues or award any relief except recovery of any royalties found owing. &nbsp;Licensor&rsquo;s recovery of its share of such Net Revenue will be the sole remedy available to Licensor by reason of any claim related to Licensor&rsquo;s royalty accountings. &nbsp;Without limiting the generality of the preceding sentence, Licensor will not have any right to seek termination of this Agreement or avoid the performance of Licensor&rsquo;s obligations under this Agreement by reason of any such claim.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">(d) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;At any time within twelve (12) months after any royalty statement is rendered to Licensor hereunder, Licensor shall have the right to give Licensee written notice of its intention to examine Licensee&rsquo;s books and records with respect to such statement. Such examination shall be commenced and completed within six (6) months after the date of such notice, at Licensor&rsquo;s sole cost and expense, by any certified public accountant, provided he or she is not then engaged in an outstanding examination of Licensee&rsquo;s books and records on behalf of a person other than you. Such examination shall be made during Licensee&rsquo;s usual business hours at the place where Licensee maintains the books and records which relate to the rights hereunder and which are necessary to verify the accuracy of the statement or statements specified in Licensor&rsquo;s notice to Licensee and the examination <span style="color:black;">shall be limited to the foregoing. Licensor&rsquo;s right to inspect such books and records shall be only as set forth in this paragraph and Licensee shall have no obligation to produce such books and records more than once with respect to each statement rendered to Licensor. &nbsp;Licensor shall cause Licensor&rsquo;s accountant to deliver a copy of his or her audit report to Licensee within three (3) months after the completion of said accountant s examination of Licensee s books and records. &nbsp; Licensor acknowledges that Licensee&rsquo;s books and records contain confidential trade information. Neither Licensor nor its representatives will communicate to others or use on behalf of any other person any facts or information obtained as a result of such examination of Licensee&rsquo;s books and records. &nbsp;The rights granted herein to Licensor constitute Licensor&rsquo;s sole right to examine Licensee s books and records. &nbsp;</span></span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;border:none;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">6. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<u>Termination</u>. &nbsp;Licensee may terminate the Term immediately: (a) in the event of any material breach of this Agreement by Licensor; (b) in the event that Licensor makes a general assignment for the benefit of its creditors; (c) in the event of the filing of a voluntary or involuntary petition against Licensor under any applicable bankruptcy or insolvency law, provided, that Licensor will have a period of ninety (90) consecutive days from its receipt of any involuntary petition in bankruptcy filed against Licensor in which to cure before Licensee may terminate the Term pursuant to this clause 8(c); or (d) in the event of the appointment of a trustee or receiver or any equivalent thereof for the Licensor or its property. The termination or expiration of the Term will not affect those representations, warranties and other obligations that by their nature survive the end of the Term. Otherwise, <span style="color:#00000A;">the Agreement shall automatically renew for successive and consecutive one (1) year <span style="background:white;">periods until terminated by either party by&nbsp;</span></span>either party providing notice to the other at least 60 days prior to the end of the applicable initial Term or renewal period.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">7. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Representations and Warranties</u>.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(a) &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp; You warrant and represent <span style="color:black;">that it: (i) is an entity duly formed and/or organized and validly subsisting pursuant to the laws of its jurisdiction of formation and/or organization; that this Agreement has been executed by a duly authorized representative; and that it has the right, power and authority to enter into this Agreement and to fully perform its respective obligations hereunder.</span></span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:72.0pt;text-indent:-36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:72.0pt;text-indent:-36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">(b) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;Licensor further warrants and represents that:</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:72.0pt;text-indent:-36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">(i) &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;No materials, ideas or other properties furnished by Licensor and embodied or contained in or used in connection with the Master Recording(s) shall violate any law or infringe upon any common law or statutory rights of any party, including without limitation, contractual rights, copyrights and rights of privacy. &nbsp; Without limiting the generality of the foregoing, Licensor specifically represents and warrants that (A) Licensor has obtained (or will obtain, as applicable) all necessary consents, permissions and clearances including, without limitation, from all persons whose appearances, names, voices or likenesses are contained in the Master Recording(s) and any promotional materials; &nbsp;(B) As between Licensee and Licensor, Licensor has or will at its own expense obtain and, to the extent required, pay for all necessary performing rights from the copyright owners of the Master Recording(s) and such other persons, firms or associations, societies or corporations as may own or control the performing rights thereto; &nbsp;(C) Licensor will not make any agreements with or representations to any guilds or unions or other third parties (including, without limitation, the Artists performing in the Master Recording(s) which would obligate Licensee to make any future payments to any third parties in connection with Licensee&rsquo;s exercise of the rights herein granted to Licensee; &nbsp;(D) Licensor owns or controls, and shall own and control, the rights necessary to make the grants of rights, licenses and permissions hereunder and necessary for Licensee to freely exploit the Master Recording(s), any promotional materials, and rights granted to it herein to effect the purpose of the Agreement, without the need for any licenses, releases, consents, approvals not granted herein or the requirement to make any payments of any nature to any person (excluding solely the obligation to pay Licensor&rsquo;s share of Net Revenue in the manner described herein); &nbsp;(E) the Master Recording(s) and any promotional materials do not and will not (I) infringe on the proprietary or intellectual property rights of any third party, including, without limitation, copyrights, trademark rights and rights of publicity and privacy or (II) violate any applicable laws (including without limitation the laws and regulations governing export control, unfair competition, anti-discrimination or false advertising); &nbsp;(F) Licensor is not aware that any third party claim has been made or threatened with respect to the Master Recording(s) or any promotional materials. &nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:72.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">(ii)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Any metadata provided by Licensor shall be complete and accurate and will confirm to all of Licensee&rsquo;s parameters for metadata and content specifications as provided by Licensee.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">(iii) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;All of Licensor&rsquo;s representations and warranties shall be true and correct upon execution hereof and shall remain in effect for so long as Licensee, its licensees, assignees, transferees or successors in interest have any rights in or to the Master Recording(s). Licensee&rsquo;s acceptance of the Master Recording(s) or other materials hereunder shall not constitute a waiver of any of Licensor&rsquo;s representations, warranties or agreements in respect thereof.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">(iv) &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;Licensee shall not be required to make any payments of any nature for or in connection with the acquisition, exercise or exploitation of any rights granted to Licensee hereunder, except as specifically provided in this Agreement.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">(v) &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Licensor shall execute and deliver to Licensee, upon Licensee s request therefor, any documents as may be required by Licensee to effectuate the intent of this Agreement, including, without limitation, any so-called &lsquo;inducement letters&rsquo;. &nbsp; If Licensor shall fail or refuse to execute and deliver any such inducement letter promptly following Licensee s request therefor, Licensor hereby appoints Licensee as Licensor&rsquo;s true and lawful attorney-in-fact to execute such inducement letter(s) in Licensor&rsquo;s name and on Licensor&rsquo;s behalf. &nbsp;Such power of attorney is irrevocable and is coupled with an interest.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">8. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Indemnification</u>. &nbsp;Each party hereto (for these purposes, &lsquo;<strong>Indemnitor</strong>&rsquo;) shall indemnify, defend and hold the other party (&lsquo;<strong>Indemnitee</strong>&rsquo;) harmless against and in respect of any claims, losses, damages or expenses (including, without limitation, reasonable attorneys  fees and litigation costs), that Indemnitee may incur, which arise from or relate to any alleged breach of, or failure by Indemnitor to perform, any of Indemnitor s representations, warranties, or promises in this Agreement or in any schedule, certificate, exhibit, or other instrument furnished or to be furnished by Indemnitor under or in connection with this Agreement. It is understood that Indemnitor&rsquo;s obligation to indemnify and defend pursuant to this paragraph shall subsist regardless of whether Indemnitor defeats the claim or the claim results in an adverse judgment or settlement. &nbsp; Indemnitee shall notify Indemnitor of any claim presented to Indemnitee by a third party. &nbsp;Indemnitor shall defend any third-party claim, at its sole expense, with counsel approved by Indemnitee, except that, at Indemnitee s option, Indemnitee may defend the claim (at Indemnitor s sole expense) and shall consult with Indemnitor about choice of counsel and the conduct of the proceeding. &nbsp;No such claim asserted by a third party may be settled by Indemnitee without Indemnitor s prior written consent (such consent not to be unreasonably withheld or delayed), so long as Indemnitee is actively defending such claim in a manner consistent with industry norms, unless Indemnitee shall agree not to seek indemnity from Indemnitor for any settlement payment made by Indemnitee to the claimant and further subject to the following. &nbsp;If Indemnitor does not approve a settlement proposed by Indemnitee, Indemnitee may nonetheless settle the matter unless, within ten (10) business days after notice to Indemnitor, Indemnitor furnishes to Indemnitee a surety bond or letter of credit from a national surety company or bank, in form and content satisfactory to Indemnitee, insuring Indemnitee against the amount of the claim in addition to reasonable attorney s fees and litigation costs expended in connection with the claim and a reasonable estimate of such fees and costs required to continue the defense. &nbsp;If any claim shall be lodged with Licensee or any action commenced having as its basis a claim which, if proved, would constitute a breach by Licensor of any of Licensor&rsquo;s representations, warranties, or covenants contained herein, Licensee, in addition to any other right or remedy otherwise available, shall have the right to control the defense thereof and settle same (subject to the above) and, additionally, may withhold from any payments otherwise due to Licensor hereunder an amount equivalent to that claimed or sued for plus reasonable costs and attorney s fees relating thereto. &nbsp; Any amount so withheld shall be credited to Licensor&rsquo;s account when Licensor shall have received reasonable assurances that the claim or action has been finally settled or fully adjudicated and the judgment satisfied, or that the statute of limitations on such claim has run, or when reasonable and adequate security for the claim has been provided to Licensee.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;color:black;">9. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Limitation of Liability</u>. &nbsp;To the maximum extent permitted by applicable law, in no event will Licensee be liable to Licensor for any loss of use, data, goodwill, revenues, or profits (whether or not deemed to constitute a direct loss), or any consequential, special, indirect, incidental, punitive, or exemplary loss, damage or expense of any kind arising out of or in any way related to the Master Recordings, the Content (as defined herein), or this Agreement, even if foreseeable or even if Licensee has been advised or should have known of the possibility of such damages. Licensee assumes no responsibility for the downtime of Licensee&rsquo;s CMS or computers, Licensor&rsquo;s network, or for the loss of information, data records, or the Content. &nbsp;In no event will Licensee&rsquo;s total liability to Licensor for all damages, losses or causes of action exceed the total amount of all types of revenue actually received and retained by Licensee in the three (3) months prior to the event which gave rise to the liability, after deducting therefrom amounts paid or due to you in respect thereof.&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">10. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<u>Relationship &amp; Taxes</u>.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">(a)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Licensor and Licensee hereby acknowledge and agree that their relationship is strictly and solely that of independent contractors, and that neither Licensor nor any of Licensor&rsquo;s employees, agents or representatives is or shall be construed as an employee of Licensee, or otherwise entitled to any benefits or insurance provided by Licensee, including any unemployment or disability benefits. Nothing contained herein shall grant Licensor any right, power or authority to bind the Licensee to any obligations.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">(b)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Each party hereto will be responsible for collecting and remitting any and all applicable taxes due with respect to (or incurred in connection with) the sale or license of such party&rsquo;s goods or services to its customers. &nbsp;Except as expressly set forth below, neither party will be liable for any taxes, duties, levies, fees, excises or tariffs incurred in connection with or related to the sale of the other party&rsquo;s goods or services. &nbsp;Notwithstanding the forgoing or anything elsewhere in this Agreement, any and all monies payable to Licensor hereunder will be reduced by all applicable sales, use, excise, purchase, value-added or similar taxes properly due and paid or payable by Licensee and its affiliates to taxing authorities with appropriate jurisdiction. &nbsp;If any amounts are required under law to be withheld from any payments to Licensor under this Agreement, Licensee will be entitled to withhold such amounts. Nothing contained herein shall grant Licensor any right, power or authority to bind the Licensee to any obligations.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">11.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Confidentiality</u>. &nbsp;Neither party (the &lsquo;<strong>Receiving Party</strong>&rsquo;) will disclose the terms of this Agreement or any Confidential Information (as defined herein) of the other party (the &lsquo;<strong>Disclosing Party</strong>&rsquo;) to any third-party except: (a) as may be required by any court of competent jurisdiction, governmental &nbsp;agency, law or regulation (in such event, the Receiving Party shall notify the Disclosing Party before such disclosure so as to give the Disclosing Party an opportunity to apply for a confidentiality order or similar remedy); (b) as part of the normal reporting or review procedure to the Receiving Party&rsquo;s accountants, auditors, employees, legal counsel, and employees of partners, parent and subsidiary need to know to perform their regular responsibilities to the Receiving Party may be disclosed to such persons, and provided further that the Receiving Party will be responsible to the Disclosing Party for any unauthorized disclosure of Confidential Information by them; (c) information which has entered the public domain through no fault of the Receiving Party or any persons to whom the Receiving Party has provided Confidential Information as permitted hereunder; and (d) with the prior written consent of the Disclosing Party. As used herein, &lsquo;<strong>Confidential Information</strong>&rsquo; shall mean the terms of this Agreement and any non&shy;public information, data, usage reports, revenue reports, Unauthorized Content (as defined herein) identification techniques, Content Claiming (as defined in Exhibit A) methods, or other materials provided by one party to the other under or in connection with this Agreement (other than the Content, promotional materials and other information intended for storage and display to end users or prospective end users under this Agreement) and any other information the receiving party should reasonably have understood under the circumstances should be treated as confidential, <span style="color:black;">whether or not the specific designation &lsquo;confidential&rsquo; or any similar designation is used, such as royalty statements and similar information. Neither party shall use any Confidential Information except as necessary for the express purpose of carrying out its respective obligations under this Agreement. The terms of this paragraph 11 shall survive the expiration or termination of the Agreement.</span></span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:black;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:black;">12. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<u>Notice</u>. &nbsp;Any&nbsp;</span><span style="font-size:12px;font-family:Times;color:black;">notice permitted or required under Agreement will be delivered in person, by United States certified mail with return receipt requested, or via overnight delivery (to the addresses on page one hereof) or via email as set forth in the next sentence. All submissions to be sent to Licensor pursuant to subparagraph 1(b) of Exhibit A may also be sent by email in lieu of physical submissions to&nbsp;</span><span style="font-size:12px;font-family:Times;">${contract.artist_email}</span><span style="font-size:12px;font-family:Times;color:black;">, and all submissions to be sent to Licensee pursuant to subparagraph 1(b) of Exhibit A may also be sent by email in lieu of physical submissions to youtube.issues@createmusicgroup.com. &nbsp;All notices to Licensee shall be copied to Boyarski Fritz LLP, 1330 Avenue of the Americas, Suite 1800, New York, NY 10019, Attn: Jason Boyarski, Esq. (or by email to jboyarski@boyarskifritz.com). If such notice or demand is served personally, notice shall be deemed constructively made at the time of such personal service. If such notice, demand or other communication is given by mail, such notice shall be conclusively deemed given three (3) days after deposit thereof in the United States mail addressed to the party to whom such notice, demand or other communication is to be given at the address set forth at the head of this Agreement or such other address as such party shall have given written notice of to the other party in accordance herewith.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:black;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">13. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<u>Credit</u>. &nbsp; Licensee shall accord Licensor an appropriate credit in connection solely with the initial release of the Master Recording(s) hereunder. &nbsp;Licensee s inadvertent failure to comply with any of its obligations under this paragraph 13 shall not be deemed a breach of this Agreement. Each party may issue a press release concerning the existence of this Agreement with the other party&rsquo;s prior approval, not to be unreasonably withheld.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">14. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<u>Miscellaneous</u>.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:9.0pt;;">Merger. &nbsp;The terms set forth in this Agreement and all exhibits and attachments hereto, constitute the entire understanding between Licensee and Licensor with respect to the subject matter hereof, all prior and/or contemporaneous negotiations and understandings being merged herein. &nbsp;This Agreement cannot be canceled, modified, amended or waived, in part or in full, in any way except by an instrument in writing signed by the party to be charged.&nbsp;</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:9.0pt;;">Severability. &nbsp;In the event any one or more of the provisions of this Agreement is invalid or otherwise unenforceable, the enforceability of remaining provisions shall be unimpaired. If any provision of this agreement, or any part thereof, is found to be invalid or unenforceable, the same shall not affect the remaining provisions, which shall be given full effect, without regard to the invalid portions. &nbsp;Moreover, if any one or more of the provisions contained in this agreement shall be held to be excessively broad as to duration, scope, activity or subject, such provisions shall be construed by limiting and reducing them so as to be enforceable to the maximum extent with applicable law.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">(c)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Headings. &nbsp;The headings of the articles and sections used in this Agreement are included for convenience only and are not to be used in construing or interpreting this Agreement.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">(d)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Modification; Waiver; Rights and Remedies. &nbsp;No waiver by Licensee or Licensor whether express or implied, of any provision of this Agreement or any default hereunder shall affect the other s right to thereafter enforce such provision or to exercise any right or remedy in the event of any other default, whether or not similar. &nbsp; Those provisions of any applicable collective bargaining agreement between Licensee and any labor organization which are required, by the terms of such agreement to be included in this Agreement shall be deemed incorporated herein.&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">(e)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Invalid Provisions. &nbsp;Nothing in this Agreement may be construed to require the commission of any act contrary to laws; provided that, in the event there is a conflict between any provisions of this Agreement and any law, contrary to which the parties hereto have no legal right to contract, (i) the provision of this Agreement so affected will be limited only to the extent necessary to permit the compliance with the minimum legal requirements, (ii) no other provisions of this Agreement will be affected thereby, and (iii) all such other provisions will remain in full force and effect. The parties hereto will negotiate in good faith to replace any invalid, illegal or unenforceable provision (the &lsquo;<strong>Invalid Provision</strong>&rsquo;) with a valid provision, the effect of which comes as close as possible to that of the Invalid Provision.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">(f)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;Choice of Law and Venue. &nbsp;This Agreement shall be governed by and construed under the laws and judicial decisions of the State of California without giving effect to the conflict of laws principles of California. All claims, disputes or disagreements which may arise out of the interpretation, performance or breach of this Agreement shall be submitted exclusively to the jurisdiction of the state courts of the State of California or the United States District Courts located in Los Angeles; provided, however, if Licensee is sued or joined in any other court or forum in respect of any matter which may give rise to a claim by Licensee hereunder, Licensor consents to the jurisdiction of such court or forum over any such claim which may be asserted by Licensee.&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">(g)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Non-Disparagement. &nbsp;Neither party will will ridicule, disparage or demean the reputation of the other Party. &nbsp; Nothing herein shall prevent the parties from making any truthful statement in connection with any legal proceeding or investigation by either Party or any governmental authority.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">(h)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Assignment. &nbsp;This Agreement will be binding upon and inure to the benefit of the parties and their permitted successors and assigns. Licensee may assign this Agreement to any subsidiary, affiliated or controlling corporation, or to any person owning or acquiring a substantial portion of the stock or assets of Licensee. Licensee may also assign and/or sublicense its rights hereunder to the extent necessary or advisable in Licensee&rsquo;s sole discretion to implement the license granted or to any third-party assignee as set forth herein. Licensor may not assign this Agreement or any of your rights hereunder and any such purported assignment shall be void.&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:9.0pt;;">Force Majeure. &nbsp;Neither party hereto will be responsible for, or be in breach of this Agreement, to the extent that its performance is frustrated or delayed as a result of any act of God, war, terrorism, pandemic/epidemic, fire, earthquake, civil commotion, act of government or any other cause wholly beyond its control and not due to its own negligence or that of its contractors or representatives, and which cannot be overcome by the exercise of due diligence.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:9.0pt;;">Counterparts. &nbsp;This Agreement may be executed by digital signature in one or more counterparts, via digital PDF copy, each of which shall be an original; but such counterparts shall together constitute but one and the same instrument.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:9.0pt;;">Cure. &nbsp;Neither party shall be in default of any term, condition, or provision of this agreement unless and until the other party gives written notice specifying such default in detail and such default, if curable, shall not have been cured within thirty (30) days after receipt of such notice. &nbsp;For the avoidance of doubt, any breach by Licensor of its exclusivity provisions hereunder shall not be a curable breach.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><strong><span style="font-size:12px;line-height:115%;font-family:Times;">Licensor acknowledges and agrees that Licensor has read this Agreement and have been advised by Licensee of the significant importance of retaining an independent attorney of Licensor&rsquo;s choice to review this Agreement on Licensor&rsquo;s behalf. Licensor acknowledges and agrees that Licensor has had the unrestricted opportunity to be represented by an independent attorney. In the event of Licensor&rsquo;s failure to obtain an independent attorney or waiver thereof, Licensor hereby warrants, represents and agrees that Licensor will not attempt to use such failure and/or waiver as a basis to avoid any obligations under this Agreement, or to invalidate this Agreement or to render this Agreement or any part thereof unenforceable.</span></strong></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style="font-size:12px;line-height:115%;font-family:Times;">IN WITNESS WHEREOF, the parties hereto have executed this Agreement on the day and year first above written.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style="font-size:12px;line-height:115%;font-family:Times;">&nbsp;</span></p>
<tr>
<td style="width: 238.75pt;padding: 0cm 5.75pt;height: 50.4pt;vertical-align: top;">
    <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
</td>
<td style="width: 269.1pt;padding: 0cm 5.75pt;height: 50.4pt;vertical-align: top;">
    <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
</td>
</tr>   <tr>
<td style="width: 238.75pt;padding: 0cm 5.75pt;height: 50.4pt;vertical-align: top;">
  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
</td>
<td style="width: 269.1pt;padding: 0cm 5.75pt;height: 50.4pt;vertical-align: top;">
  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
</td>
</tr>   <tr>
<td style="width: 238.75pt;padding: 0cm 5.75pt;height: 50.4pt;vertical-align: top;">
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
</td>
<td style="width: 269.1pt;padding: 0cm 5.75pt;height: 50.4pt;vertical-align: top;">
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
</td>
</tr>
<div style='display: flex; justify-content: center; align-items: center; margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <table>
      <tbody>
          <tr>
              <td rowspan="6" style="width: 36.5pt;padding: 0cm 5.75pt;vertical-align: top;">
                  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
              </td>
              <td style="width: 238.75pt;padding: 0cm 5.75pt;vertical-align: top;">
                  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>LICENSOR&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></p>
              </td>
              <td style="width: 269.1pt;padding: 0cm 5.75pt;vertical-align: top;">
                  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>LICENSEE &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></p>
              </td>
              <td rowspan="6" style="width: 36.75pt;padding: 0cm 5.75pt;vertical-align: top;">
                  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
              </td>
          </tr>
      
          <tr>
              <td style="width: 238.75pt;padding: 0cm 5.75pt;vertical-align: top;">
                  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:center;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:#00000A;'>An Authorized Signatory</span></p>
                  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:center;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:#00000A;background:white;'>${contract.artist_name}</span></p>
              </td>
              <td style="width: 269.1pt;padding: 0cm 5.75pt;vertical-align: top;">
                  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:center;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:#00000A;'>An Authorized Signatory</span></p>
                  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:center;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:#00000A;'>CREATE MUSIC GROUP, INC.</span></p>
              </td>
          </tr>
          <tr>
              <td style="width: 238.75pt;padding: 0cm 5.75pt;height: 28.8pt;vertical-align: bottom;">
                  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:#00000A;'>&nbsp;</span></p>
                  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:#00000A;'>Name:&nbsp;</span><span style="color:white;background:white;">\n</span></p>
              </td>
              <td style="width: 269.1pt;padding: 0cm 5.75pt;height: 28.8pt;vertical-align: bottom;">
                  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:#00000A;'>Name:</span><u>&nbsp;</u><span style="color:white;background:white;">\n</span></p>
              </td>
          </tr>
          <tr>
              <td style="width: 238.75pt;padding: 0cm 5.75pt;height: 28.8pt;vertical-align: bottom;">
                  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:#00000A;'>Date:&nbsp;</span><span style="color:white;background:white;"></span></p>
              </td>
              <td style="width: 269.1pt;padding: 0cm 5.75pt;height: 28.8pt;vertical-align: bottom;">
                  <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;border:none;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:#00000A;'>Date:&nbsp;</span><span style="color:white;background:white;"></span></p>
              </td>
          </tr>
      </tbody>
  </table>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
<p><strong><span style='font-size:15px;line-height:115%;font-family:"Times New Roman",serif;'><br></br>&nbsp;</span></strong></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><strong><span style='font-family:"Times New Roman",serif;'>&nbsp;</span></strong></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:center;'><strong><span style="font-size:12px;line-height:115%;font-family:Times;">Schedule A</span></strong></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:center;'><span style="font-size:12px;line-height:115%;font-family:Times;">Licensor&rsquo;s owned catalog of visual, audio, and audiovisual assets.</span></p>
<table style="border: 1px solid black; border-collapse: collapse; text-align: center;">
<thead>
  <tr>
    <th style="border: 1px solid black;">ISRC</th>
    <th style="border: 1px solid black;">Title</th>
    <th style="border: 1px solid black;">Stream Income Share</th>
  </tr>
</thead>
<tbody>
  ${tableData}
</tbody>
</table>

<p><span style='font-size:15px;line-height:115%;font-family:"Times New Roman",serif;'><br></br>&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:center;'><strong><u><span style='font-size:12px;font-family:"Times New Roman",serif;'>EXHIBIT A &ndash; CONTENT CLAIMING SERVICES</span></u></strong></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><strong><u><span style='font-size:12px;font-family:"Times New Roman",serif;'><span style="text-decoration:none;">&nbsp;</span></span></u></strong></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><u><span style="font-size:12px;font-family:Times;"><span style="text-decoration:none;">&nbsp;</span></span></u></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">1.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Definitions</u>.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:9.0pt;;">&lsquo;<strong>Claiming Net Revenue</strong>&rsquo; &ndash;&nbsp;</span><span style="font-family:Times;">gross revenue actually received by Licensee from Content Claiming (as defined herein), less Licensee&rsquo;s out-of-pocket collection and third-party transaction processing costs (<em>e.g.&nbsp;</em>wire, PayPal, or currency conversion costs).</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:9.0pt;;">&nbsp;&lsquo;<strong>Content</strong>&rsquo; &ndash; any&nbsp;</span><span style="font-family:Times;">audio, visual, and/or audiovisual media (including without limitation,&nbsp;</span><span style="font-family:Times;">motion pictures, photographs and videos [including those posted by third parties], and all associated meta&shy;data including the names, likenesses, trademarks and trade names in all such media and metadata), which is solely owned or controlled by Licensor and any and all Content owned or controlled by Licensor during the &nbsp;Term including, without limitation, the Master Recordings. &nbsp; Either party may submit potential Content for approval to the other party. Such approval may be given by email to the applicable email address set forth in the notice provision hereunder.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:9.0pt;;">&lsquo;<strong>Media</strong>&rsquo; &ndash;&nbsp;</span><span style="font-family:Times;font-size:9.0pt;">the platforms upon which the Content is uploaded and monetized including but not limited to Content that has been uploaded to YouTube, Facebook, Soundcloud, YouTube Premium, YouTube Music and other social media platforms.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:9.0pt;;">&lsquo;<strong>Unauthorized Content</strong>&rsquo; &ndash; any content taken or reproduced (in whole or in part) from any Content that has been uploaded on Media without the consent of authorization of Licensor.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:9.0pt;;">&lsquo;<strong>YouTube</strong>&rsquo; &ndash;&nbsp;</span><span style="font-family:Times;font-size:9.0pt;">all consumer facing third party digital websites, URL&rsquo;s, domains, and applications whether accessible from the internet, mobile or wireless networks, via computer, mobile device, console or otherwise, that display and/or contain YouTube videos and/or embeds, including but not limited to Facebook, MySpace, Snapchat, and any other website and/or social media platform which contains YouTube hosted and/or embedded videos.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">For the avoidance of doubt, all capitalized terms used herein shall be accorded the same meaning as in the Agreement unless otherwise provided in this Exhibit A.&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><strong><u><span style="font-size:12px;font-family:Times;"><span style="text-decoration:none;">&nbsp;</span></span></u></strong></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">2.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Content Claiming Rights Granted</u>.&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(a)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;During the Term</span><span style="font-size:12px;font-family:Times;">&nbsp;and within the Territory, Licensor hereby grants Licensee the exclusive right (</span><span style="font-size:12px;font-family:Times;">via the Media) to:&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(i)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;monitor the Media for the reproduction, distribution, public performance, public display, and synchronization of the Content with user-uploaded videos and monetize and/or claim the Content;&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(ii)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;collect any and all monies derived from such monetization and/or claiming;&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(iii)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;block, disable, and/or takedown Unauthorized Content;&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(iv)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;access and utilize Licensor&rsquo;s manager accounts in connection with the Media hereunder;&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(v)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;create, on behalf of Licensor, art tracks using the Content hereunder (including, where applicable, lyrics) (&lsquo;<strong>Art Tracks</strong>&rsquo;), and as between the parties Licensor shall own all right, title and interest in and to such Art Tracks; and</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(vi)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;send DMCA take&shy;down notices to Media channels distributing videos containing links to unauthorized downloads of the Content (collectively, such activities are &lsquo;<strong>Content Claiming</strong>&rsquo;).&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(b)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Licensor grants Licensee the right to use Licensor&rsquo;s name, image, voice, signature, biography, and likeness in and in connection with the exploitation of Licensor&rsquo;s Content. &nbsp;Licensor grants to Licensee the right to change the duration, transcode, resize and reformat the Content insofar as necessary to repurpose, watermark, and/or fingerprint the Content for monitoring on YouTube in accordance with the purpose of this license. In connection with the Art Tracks, all album artwork, cover art and any other materials utilized in connection with the Content in the Media by Licensor (e.g. album art contained on SoundCloud) is hereby approved for Licensee&rsquo;s use in connection with the Art Tracks. Licensor may deliver to Licensee an alternative visual image or images to use in connection with the Art Tracks, subject to Licensee&rsquo;s reasonable approval in each instance. In the event Licensee selects an alternative visual image or images not provided to Licensee by Licensor, such images will be subject to Licensor&rsquo;s approval, not to be unreasonably withheld or delayed. In the event Licensor does not approve of Licensee&rsquo;s alternative visual image(s), Licensor will use reasonable efforts to provide Licensee with comparable replacement images.&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">3.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Licensor&rsquo;s Content Claiming Obligations</u>. &nbsp;During the&nbsp;</span><span style="font-size:12px;font-family:Times;">T</span><span style="font-size:12px;font-family:Times;">erm, Licensor shall:</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(a)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Deliver the Content in a format, resolution, and bitrate as is customary to Licensee or as otherwise designated by the delivery method specified or agreed to by Licensee. Licensee may modify the required delivery formats and/or destination address at any time upon reasonable notice to Licensor. Any sound recordings or musical compositions embodied on the Content must be delivered with the song title, and Licensor&rsquo;s name;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(b)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Take all such actions as may be required by Licensee or Media (including without limitation giving email or other notice to Media) in order to enable Licensee to claim the Content in the manner described herein including, without limitation, delivering reference files for the Content to enable Licensee to conduct the Content Claiming services herein.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(c)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Provide Licensee with written notice of any Media channel to be &lsquo;white&shy;listed.&rsquo;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(d)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Partner any and all associated YouTube channels and SoundCloud profiles and allow Licensee full administrative rights: including viewing revenue, receiving and paying out revenue, and monetizing uploads</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(e)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Cooperate with Licensee&rsquo;s requests in order to finalize channel partnerships</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(f)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;Set forth any and all Territory restrictions for each individual piece of Content in the metadata related to that Content, and subsequently update such metadata from time to time.&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(g)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Provide Licensee with all applicable logins (i.e., password/login <span style="color:black;">name, email, etc.) to the manager accounts associated with the Media, and such logins shall be treated as Confidential Information in accordance with paragraph 11 of the Agreement.</span></span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">4.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Content Claiming Royalty</u>. &nbsp;Licensee shall pay Licensor, conditioned upon Licensor&rsquo;s satisfaction of all covenants and conditions contained herein, 70% of the Claiming Net Revenue actually received by the Licensee in connection with Content Claiming of Licensor&rsquo;s Content (the &lsquo;<strong>Content Claiming Royalty</strong>&rsquo;). &nbsp;Licensee shall pay Licensor, conditioned upon Licensor&rsquo;s satisfaction of all covenants and conditions contained herein, 90% of the Net Revenue actually received by the Licensee in connection with Licensor&rsquo;s SoundCloud Content (the &lsquo;<strong>SoundCloud Royalty</strong>&rsquo;). &nbsp;The Content Claiming Royalty&nbsp;</span><span style="font-size:12px;font-family:Times;">and SoundCloud Royalty&nbsp;</span><span style="font-size:12px;font-family:Times;">shall be payable to Licensor in accordance with the terms of paragraph 5 of the Agreement.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">5.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Content Claiming Representations and Warranties</u>. &nbsp; Licensor hereby warrants and represents that:</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(a)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Licensor has obtained all necessary clearances with respect to all third-party materials used in the Content and/or Art Tracks (including without limitation, all musical compositions, performances, samples, names and likenesses) and, if applicable, shall be solely responsible for paying any royalties due to third parties, including performing rights societies, in connection with the use, performance, or other exploitation of the Content, and Licensor is not aware of any third-party claim that has been made or threatened with respect to the Content. Upon request, Licensor shall provide copies of such clearance paperwork;&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(b)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Licensor&rsquo;s has or will at its own expense obtain and, to the extent required, pay for all necessary performing rights from the copyright owners of the Content and such other persons, firms or associations, societies or corporations as may own or control the performing rights thereto;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(c)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Licensor&rsquo;s Content does not and shall not: (a) infringe on the proprietary or intellectual property rights of any third party, including, without limitation, copyrights, trademark rights and rights of publicity and privacy or (b) violate any applicable laws (including without limitation the laws and regulations governing export control, unfair competition, antidiscrimination or false advertising);</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(d)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Licensor owns or controls, and shall own and control, the rights necessary to grants the rights, licenses and permissions granted to Licensee hereunder to allow Licensee to freely exploit the Content and rights granted to Licensee herein to effect the purpose of the Exhibit A, without the need for any licenses, releases, consents, approvals not granted herein or the requirement to make any payments of any nature to any person (excluding solely the obligation to pay royalties to Licensor in the manner described herein); and</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(e)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Licensor has or will at its own expense obtain and, to the extent required, pay for all necessary performing rights from the copyright owners of the Content and such other persons, firms or associations, societies or corporations as may own or control the performing rights thereto.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">6.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Exclusivity</u>. &nbsp;If at any time Licensor engages any other person or entity to perform the Content Claiming services, then, without limiting Licensee&rsquo;s rights, Licensee shall have the right, exercisable at any time by written notice to Licensor (email shall suffice), to extend the&nbsp;</span><span style="font-size:12px;font-family:Times;">&nbsp;</span><span style="font-size:12px;font-family:Times;">&nbsp;Term of the Agreement as it relates to Licensee&rsquo;s Content Claiming Rights pursuant to this Exhibit A. Such extension shall continue until Licensor has fully cured such engagement or terminated any engagement which is in violation of this Exhibit A, and the &nbsp;Term of the Agreement as it relates to Licensee&rsquo;s Content Claiming Rights pursuant to this Exhibit A shall be extended for a period of time equal to the duration of any such engagement. &nbsp;Licensor acknowledges that Licensee&rsquo;s exercise of its rights hereunder shall not in any way affect or diminish its right to seek equitable relief hereunder.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><strong><u><span style='font-size:12px;line-height:115%;font-family:"Times New Roman",serif;'><span style="text-decoration: none;">&nbsp;</span></span></u></strong></p>
<p><strong><u><span style='font-size:12px;line-height:115%;font-family:"Times New Roman",serif;'><br></br>&nbsp;</span></u></strong></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><strong><u><span style='font-size:12px;line-height:115%;font-family:"Times New Roman",serif;'><span style="text-decoration: none;">&nbsp;</span></span></u></strong></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:center;'><strong><u><span style='font-size:12px;font-family:"Times New Roman",serif;'>EXHIBIT B &ndash; CHANNEL PARTNERSHIP SERVICES</span></u></strong></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><strong><u><span style='font-size:12px;font-family:"Times New Roman",serif;'><span style="text-decoration:none;">&nbsp;</span></span></u></strong></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><strong><u><span style="font-size:12px;font-family:Times;"><span style="text-decoration:none;">&nbsp;</span></span></u></strong></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">1.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Channel Partnership Services</u>. &nbsp;During the Term, Licensee will provide Licensor with the following services:</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(a)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Grant&nbsp;</span><span style="font-size:12px;font-family:Times;">access to any content libraries that Licensee makes available generally to its content providers such as Licensor for use in Your Videos;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(b)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Consider Licensor&rsquo;s Content for: (i) the sale of Direct Ads; (ii) the sale of Branded Entertainment Arrangements; and for Other Platform opportunities, if applicable; (iii) distribution on one or more Create Music Group Channels (such distribution, if any, shall be subject to Licensor&rsquo;s prior written approval); and</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(c)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Provide, in Create Music Group&rsquo;s sole discretion, either by Create Music Group or by one or more of its Affiliates, other value-added benefits or services that may be typically offered to content providers such as You under Create Music Group&rsquo;s content provider agreements, which may include graphic design, content production, channel management, and content strategy sessions.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;line-height:115%;font-family:Times;">2.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Channel Partnership Grant of Rights</u>. &nbsp;During the &nbsp;Term, Licensor grants to Licensee the following transferable, sub licensable, royalty-free rights (but not obligations) in the Territory:</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(a)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;The exclusive right (other than the independent rights, if any, of Your Platforms to sell Ads) to sell and represent any and all Ad inventory in relation to Your Content and Claimed Content on Your YouTube Channels;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(b)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;The exclusive right (as between Create Music Group and any other third party, but not excluding You) to sell and represent Your Content and Claimed Content on Your YouTube Channels for the purposes of securing Branded Entertainment Arrangements, subject to Your written approval in each instance, such approval not to be unreasonably withheld or delayed;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(c)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;The non-exclusive right to use or deal with Your ID (including to undertake all activities referred to in Section 4(c) to promote Your Content and Claimed Content, the Create Music Group Network, and any brand owned (in whole or in part), licensed or operated (in whole or in part) by Create Music Group, its Affiliates or its sub-licensees from time to time;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(d)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;The exclusive &nbsp;right &nbsp; to display, &nbsp;exhibit, &nbsp;perform &nbsp; (publicly &nbsp;or otherwise), &nbsp;distribute, &nbsp; advertise, &nbsp;promote, &nbsp;publish, transmit, translate, stream, broadcast, &nbsp;adapt, modify, prepare derivative works based on, synchronize &nbsp; (in timed relation or otherwise) compile, encode, host, cache, route, index, store, copy, reproduce, reformat, excerpt, analyze, create algorithms and ID Files based on, and otherwise use, exploit, or deal with Your Content or Claimed Content on YouTube or in connection with Create Music Group&rsquo;s Services or Create Music Group&rsquo;s business on YouTube, including to display Create Music Group&rsquo;s and any of its sub-licensee&rsquo;s promotional material on or in connection with Your Content and Claimed Content, and to associate Your Content and Claimed Content with any brand owned (in whole or in part), licensed, or operated by Create Music Group, its Affiliates, or its sub-licensees from time to time; and&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(e)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;The non-exclusive right to otherwise use Your Content and Claimed Content to perform all obligations, and exercise all rights, of Create Music Group as set out in this Exhibit B.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">3.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Channel Partnership Royalties</u>. &nbsp;In connection with the Channel Partnership Services, Licensee shall pay to Licensor (Licensor&rsquo;s percentages of Net Revenue as provided in paragraphs 3(a)-3(f) below are collectively referred to as the &lsquo;<strong>Channel Partnership Royalties</strong>&rsquo;):</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-family:Times;">80% of Google Ad Net Revenue received by Create Music Group from Your Videos on Your YouTube Channels and Create Music Group Channels;</span></li>
  </ol>
</div>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-indent:36.0pt;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:9.0pt;color:windowtext;">If any Direct Ads are sold (in addition to the Google Ads sold), an amount equal to&nbsp;</span><span style="font-family:Times;color:windowtext;font-size:12px;color:windowtext;">50%</span><span style="font-family:Times;font-size:9.0pt;color:windowtext;">&nbsp;of Direct Ad Net Revenue received by Create Music Group from Your Videos on Your YouTube Channels or on a Create Music Group Channel; provided, however, in the event You provide a notice of termination but Create Music Group has secured or secures a signed insertion order (&lsquo;<strong>IO</strong>&rsquo;) related to any Direct Ad campaigns (targeting your YouTube Channel) following a notice of termination but prior to the termination of the Agreement, the Agreement shall continue in full force and effect as to such Direct Ads until the completion date of the applicable Direct Ad campaign as set forth in the applicable IO.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(c)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(i)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;Sixty percent (60%) of all Branded Entertainment Net Revenue received by Create Music Group from Branded Entertainment Arrangements secured by Create Music Group;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(ii)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Sixty percent (60%)</span><span style="font-size:12px;font-family:Times;">&nbsp;of all Branded Entertainment Net Revenue received by Create Music Group from Branded Entertainment Arrangements secured by You, but administered or managed by Create Music Group;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(d)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;80% of Music Subscription Service Net Revenue received by Create Music Group from Your Content being distributed on or through the Music Subscription Service;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(e)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;80% of AudioSwap Library Net Revenue received by Create Music Group from the use and/or inclusion of AudioSwap Recordings in User Content. See the YouTube AudioSwap Terms and Conditions.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(f)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span style='font-size:12px;font-family:"Times New Roman",serif;'>The Channel Partnership Royalties shall be payable to Licensor in accordance with the terms of paragraph 5 of the Agreement. In addition to the amounts set forth above, Licensee shall also pay Licensor a portion of any other revenue received by Licensee in connection with this Agreement (i.e., off-You-Tube revenue), as mutually agreed in writing (email shall suffice) by the parties on a case-by-case basis.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(g)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Notwithstanding anything to the contrary contained in this Exhibit B, Create Music Group shall not be liable for, and may charge back to You, any payment based on: (i) any amounts which arise or result from any of the prohibited conduct set out in Section 3 above; (ii) Action Fraud, regardless of whether condoned or initiated by You; (iii) Ads delivered to End Users whose browsers have JavaScript disabled; and (iv) Ads created or produced for Create Music Group or the Platform on which the Ad appears for their own products and/or services. Create Music Group reserves the right to withhold payment otherwise due to You pending Create Music Group&rsquo;s reasonable investigation of any activity referred to in this Section 5(f) or of any breach or suspected breach of this Agreement by You. &nbsp;You agree to cooperate with Create Music Group in its investigation of any of the foregoing.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">4.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Licensor&rsquo;s Channel Partnership Obligations</u>. &nbsp; During the Term, Licensor will:</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;font-size:9.0pt;'>Promptly take all such action as may be required by Create Music Group in order to permit: (i) Your Content to be included in Create Music Group&rsquo;s CMS; and (ii) the views of Your Content and Claimed Content to be included or &ldquo;rolled up&rdquo; exclusively into Create Music Group&rsquo;s views, impressions, and other reporting metrics;</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;font-size:9.0pt;'>Create or acquire Your Videos on a frequency and at a level of quality consistent with Your Content uploaded to Your YouTube Channels prior to the Effective Date, and promptly upload them to Your YouTube Channels;</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:62px;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;font-size:9.0pt;'>Maintain and manage the development of Your YouTube Channels; and&nbsp;</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;font-size:9.0pt;'>For the purposes of Create Music Group Claiming Your Videos on YouTube, provide to Create Music Group upon Create Music Group&rsquo;s request metadata for Your Videos not uploaded onto Your YouTube Channels in a form acceptable to Create Music Group.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;font-size:9.0pt;'>Comply with all: (i) policies and procedures of Create Music Group as may be in effect from time to time, including Create Music Group&rsquo;s Terms of Service displayed on Create Music Group&rsquo;s websites, and Create Music Group&rsquo;s Privacy Policy displayed on Create Music Group&rsquo;s websites (&ldquo;<strong>Create Music Group&rsquo;s Privacy Policy</strong>&rdquo;), &nbsp;all of which are incorporated herein by this reference, and if you are an individual, Create Music Group may collect, use and disclose certain personal information from and about you in accordance with Create Music Group&rsquo;s Privacy Policy; (ii) applicable policies, procedures, or End User agreements and privacy policies of Your Platforms (each a &ldquo;<strong>Content Guideline</strong>&rdquo;); and (iii) applicable laws, rules, and regulations. ;</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;font-size:9.0pt;'>Not, and will not authorize any third party to, distribute any content or attempt to monetize any content that infringes on the rights of others or violates any Content Guidelines; and&nbsp;</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:0cmundefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;font-size:9.0pt;'>Not, and will not authorize or encourage any third party to, directly or indirectly generate queries, impressions of or clicks on any Ad(s) or to obtain access to Your Content through: (A) any automated, deceptive, fraudulent or other invalid means, including through repeated manual clicks, the use of robots or other automated query tools and/or computer generated search requests, or the fraudulent use of other search engine optimization services and/or software; (B) clicks or impressions originating from Your IP address or Your computers; (C) the payment of money, false representation or requests for users to click on Ads; or (D) any other means designed to imitate a legitimate End User or otherwise skew results (collectively, &ldquo;<strong>Action Fraud</strong>&rdquo;).</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">5.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Intellectual Property &amp; Feedback</u>. &nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(a)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Unless the parties agree otherwise in writing, the parties acknowledge and agree that any proprietary intellectual property and rights, including any copyrights, trademarks, service marks, trade names, monikers, trade dress, patents or other intellectual property, that has been or will be provided by either party to the other party hereunder will remain the sole and exclusive property of the providing party. &nbsp;In particular, as between You and Create Music Group, Create Music Group retains all right, title, and interest in and to Create Music Group&rsquo;s services and the proprietary technology, websites, software, products, services, processes, information, or materials used in the provision of such services (collectively, &lsquo;<strong>Create Music Group Property</strong>&rsquo;). Nothing herein shall be construed to restrict, impair, encumber, alter, deprive, or adversely affect Create Music Group Property or any of Create Music Group&rsquo;s rights or interests therein or any other Create Music Group intellectual property, brands, information, content, processes, methodologies, products, goods, services, materials, or rights, tangible or intangible. &nbsp;All rights, title, and interest in and to Create Music Group Property that are not expressly granted in this Agreement are reserved by Create Music Group.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(b)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;You may from time to time provide suggestions, comments or other feedback to Create Music Group with respect to Create Music Group&rsquo;s Services (&lsquo;<strong>Feedback</strong>&rsquo;). &nbsp; Feedback, even if designated as confidential by You, shall not create any confidentiality obligation for Create Music Group notwithstanding anything else. &nbsp; &nbsp;You shall, and hereby do grant Create Music Group a non-exclusive, worldwide, perpetual, irrevocable, transferable, sub-licensable, royalty-free, fully-paid-up license to use the Feedback for any purpose.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">6.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u>Definitions</u>.&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(a)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Ad</strong>&rsquo; &ndash; an advertisement: &nbsp;(i) served with, in, on or in relation to Your Videos or Your YouTube Channels, including pre-roll, in-stream, post-roll, overlay and synchronized banner advertisements that have been sold specifically against Your Videos or Your YouTube Channels (as opposed to, for example, banner advertisements and advertising inventory appearing on Platforms or Channels, other than Your YouTube Channels, that are not directly and specifically sold against Your Videos or Your YouTube Channels); and (ii) the revenue generated from which can be tracked and directly tied to Your Videos or Your YouTube Channels. For the avoidance of doubt, Ads exclude Branded Entertainment Arrangements.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(b)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Affiliate&rsquo;</strong> &ndash; any other person that directly or indirectly controls, is controlled by, or is under common control with such person, except that for purposes of this Agreement. &nbsp;For purposes of this definition, a person &lsquo;controls&rsquo; another person if such person possesses, directly or indirectly, the power to direct the management and policies of that other person, whether through ownership of voting securities, by contract or otherwise and &lsquo;controlled by&rsquo; and &lsquo;under common control with&rsquo; have similar meanings.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(c)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Allowable Costs</strong>&rsquo; &ndash; in connection with a Branded Entertainment Arrangement, all costs incurred by Create Music Group or an Affiliate of Create Music Group, or both, in the production of Your Video that is subject to such Branded Entertainment Arrangement, up to such maximum amount as may be agreed to by You and Create Music Group.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(d)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Create Music Group Channels</strong>&rsquo; &ndash; all Channels owned or controlled by Create Music Group or any of its Affiliates, in whole or in part, but does not include Your YouTube Channels or any other Channels in the Create Music Group Network under Content Provider Agreements between Create Music Group or an Affiliate of Create Music Group and Providers such as You.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(e)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Create Music Group Network</strong>&rsquo; &ndash; all Channels under Content Provider Agreements between Create Music Group or an Affiliate of Create Music Group and Providers such as You, and all Channels and Platforms owned or controlled by Create Music Group, in whole or in part, or through which Create Music Group distributes content, including the Create Music Group Channels.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(f)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&lsquo;<strong>Create Music Group Platform</strong>&rsquo; &ndash; a Platform owned or controlled by Create Music Group or an Affiliate of Create Music Group, in whole or in part.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(g)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Branded Entertainment Arrangement</strong>&rsquo; &ndash; an arrangement pursuant to which:</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(i) &nbsp; Your Video includes the appearance of a branded product or service within the video itself and within the context of the subject-matter of the video for the purposes of the promotion of such product or service, including product placements; or</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(ii) &nbsp;Your Video contains or is accompanied by a notification to the effect that Your Video has been sponsored or otherwise supported by, or a promotional consideration has been made by, a specified brand or third party; where You, Create Music Group and/or an Affiliate of Create Music Group has received, or is entitled to receive, consideration from the owner or promoter of such brand or third party in return for such appearance.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(h)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Branded Entertainment &nbsp;Net &nbsp;Revenue</strong>&rsquo; &ndash; the revenue actually received by Create Music Group pursuant to a Branded Entertainment Arrangement, less the following amounts charged, levied, paid or payable in relation to such revenue: (i) taxes (other than net income taxes) and other government levies; (ii) Allowable Costs, if any; and (iii) the Rights Fee, if any.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(i)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&lsquo;<strong>Channel</strong>&rsquo; &ndash; an online, wireless, broadcast or digital medium, whether now known or hereafter created or devised, on which Video Content is distributed or displayed. &nbsp;For greater certainty, &lsquo;Channel&rsquo; includes TV channels; channels accessible via Video Content websites such as YouTube; channels accessible via software applications such as mobile applications, desktop applications, and web-based applications; and websites that You own or control that distribute or display Your Videos. &nbsp;A Channel may also be a Platform.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.45pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(j)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&lsquo;<strong>CMS</strong>&rsquo; &ndash; Create Music Group&rsquo;s content management system with Google, in the case of YouTube content management, and in the case of other Platforms, with the owner or operator of such Platform.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.45pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(k)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Controls</strong>&rsquo; &ndash; in relation to a Channel, the right of a person or entity who is not the owner or operator of the Platform that such Channel is within, to distribute Video Content on such Channel to the exclusion of all third parties, or all third parties other than such Platform owner or operator.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.6pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(l)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&lsquo;<strong>Direct Ad</strong>&rsquo; &ndash; an Ad sold by, or with the consent or authorization of, Create Music Group (other than Google Ads).</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.3pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(m)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&lsquo;<strong>Direct Ad Net Revenue</strong>&rsquo; &ndash; the revenue earned and actually received by Create Music Group or Affiliate of Create Music Group, whichever is the seller, in such period from Direct Ads, less the following amounts charged, levied, paid or payable by Create Music Group or such Affiliate in relation to such revenue: (i) 5% of such revenue as a commission retained by Create Music Group or such Affiliate; (ii) applicable advertising-related &nbsp; rebates and commissions (including commissions due to employees or consultants of Create Music Group or such Affiliate) and cost of inventory, if any; (iii) amounts due to advertising providers, if any; (iv) taxes (other than net income taxes) and other government levies; (v) the Google Fee, if any (to the extent not deducted prior to Create Music Group&rsquo;s or such Affiliate&rsquo;s receipt of such revenue); and (vi) the Rights Fee, if any.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.6pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(n)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>End User</strong>&rsquo; &ndash; person(s) accessing Your Videos via a Platform, or via a Channel within a Platform.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.4pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(o)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Effective Date</strong>&rsquo; of this Agreement means the date Create Music Group sends an email or other electronic communication to You to the effect that You have been partnered with Create Music Group or otherwise acknowledging that You have joined a Create Music Group Network, unless Create Music Group specifies another date as being the Effective Date in such email or other electronic communication or in an accompanying email or other electronic communication, in which case the Effective Date shall be the date so specified.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.6pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(p)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Google</strong>&rsquo; means Google Inc. or any of its Affiliates, including YouTube LLC, or their successors or assigns.&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:70.55pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.6pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(q)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Google Ad</strong>&rsquo; means an Ad sold by Google with respect to Your Videos or Your YouTube Channels.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.6pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.4pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(r)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&lsquo;<strong>Google Ad Net Revenue</strong>&rsquo; for any period means the revenue earned and actually received by Create Music Group in such period from Google Ads with respect to Your Content on YouTube, less the following amounts charged, levied, paid or payable in relation to such revenue: (a) taxes (other than net income taxes) and other government levies; (b) the Google Fee, if any (to the extent not deducted prior to Create Music Group&rsquo;s receipt of such revenue); and (c) the Rights Fee, if any.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.45pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(s)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Google Fee</strong>&rsquo; means any amount charged by Google, in the case of YouTube, or in the case of any Other Platform, charged by the owner or operator thereof, in relation to the monetization of all or any part of Your Content.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.4pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(t)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&lsquo;<strong>ID File</strong>&rsquo; means the unique binary data that describes Your Content, and which is used for the automatic identification of that content.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.35pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(u)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Other Net Revenue</strong>&rsquo; &ndash; the revenue earned and actually received by Create Music Group in such period from the distribution, monetization, and/or exploitation of Your Content in a manner other than:</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:129.4pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(i) &nbsp;through the sale of Google Ads, Direct Ads, or Branded Entertainment Arrangements,&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:129.4pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:-1.0pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(ii) from the Music Subscription Service (as defined in Exhibit C herein), or</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:-1.0pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:-1.0pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(iii) from the use and/or inclusion of AudioSwap Recordings (as defined in Exhibit D herein) in User Content, if any,</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.4pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">but includes revenue earned and actually received by Create Music Group in connection with Your Content from rentals, in-app purchases, and download-to-own &nbsp;methods of monetization, less the following amounts charged, levied, paid or payable in relation to such revenue: &nbsp;(i) taxes (other than net income &nbsp;taxes) and other government &nbsp;levies; (ii) applicable &nbsp;advertising-related rebates and commissions (including commissions due to employees or consultants of Create Music Group) and cost of inventory, if any; (iii) amounts due to advertising providers, if any; (iv) the Google Fee, if any (to the extent not deducted prior to Create Music Group&rsquo;s receipt of such revenue); (v) the Rights Fee, if any; and (vi) amounts due to Create Music Group&rsquo;s content aggregators, if any.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.6pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(v)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Other Platform</strong>&rsquo; means a Platform other than YouTube.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:538.15pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.35pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(w)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&lsquo;<strong>Platform</strong>&rsquo; means a technology, service, product, tool, interface, vehicle or system, whether now known or hereafter created or devised, on which one or more Channels or Video Content are hosted, powered, operated, managed, accessed, displayed, distributed, or viewed. &nbsp;For greater certainty, &lsquo;Platform&rsquo; includes websites such as YouTube and Facebook, and other third party websites &nbsp;that are not owned or controlled &nbsp;by You; software &nbsp;applications &nbsp;such as mobile applications, desktop applications, and web-based applications; television; radio; film; videotape or audiotape; CD&rsquo;s; and DVD&rsquo;s; but any Channels &nbsp; within &nbsp;a Platform, &nbsp;such &nbsp; as YouTube &nbsp;Channels &nbsp;within &nbsp; the YouTube &nbsp;Platform &nbsp;or Facebook &nbsp; pages &nbsp;within &nbsp;the Facebook Platform, are not themselves separate Platforms but instead form part of the Platform they are on or within. &nbsp;A Platform that does not have separate Channels is also a Channel.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:302.5pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.6pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(x)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Reference Files</strong>&rsquo; means digital files of Your Content.&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.45pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(y)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Rights Fee</strong>&rsquo; means amounts due to third party rights holders, if any, for the use or distribution of such third party&rsquo;s sound recordings, compositions, logos, trademarks, or other audio, visual or audio-visual elements or rights, where the right to use such elements or rights was provided to You by or through Create Music Group.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.35pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(z)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>User Content</strong>&rsquo; means copies of Your Content or any element or part thereof, which are posted on a Platform from time to time by users of such Platform other than You or Create Music Group, without prior authority from You or Create Music Group to do so.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.6pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(aa)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Video Content</strong>&rsquo; means any audio, visual or audio-visual media content.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.45pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(bb)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lsquo;<strong>YouTube</strong>&rsquo; means the internet video-sharing &nbsp;website known as &lsquo;YouTube&rsquo; on which users can upload, share and view videos, &nbsp;at &nbsp;</span><a href="http://www.youtube.com/"><span style="font-size:12px;font-family:Times;color:windowtext;">www.youtube.com</span></a><a href="http://www.youtube.com/"><span style="font-size:12px;font-family:Times;color:windowtext;text-decoration:none;">, &nbsp;</span></a><span style="font-size:12px;font-family:Times;color:windowtext;">including &nbsp;all mirror &nbsp; and derivative &nbsp;sites, and any and all other localized &nbsp;or international versions of such website, and includes any successor or replacement thereof.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.6pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(cc)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>YouTube Channel</strong>&rsquo; means a Channel on or within YouTube.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.4pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(dd)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Your ID</strong>&rsquo; means Your name, likeness, trademarks, brands, logos, trade names and any other monikers, trade dress or the like identifying You or Your Content.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.3pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(ee)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Your Platforms</strong>&rsquo; means the Platforms on which Your Videos are displayed, exhibited, performed, distributed, published, transmitted, streamed or broadcasted.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.3pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.3pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(ff)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&lsquo;<strong>Your Content</strong>&rsquo; means Your YouTube Channels and Your Videos, and includes the following contained within &nbsp;or related &nbsp;to Your &nbsp; YouTube &nbsp;Channels &nbsp;and &nbsp; Your &nbsp;Videos: (i) graphics, music, sounds, images, files, photos, animation, artwork, text, data, information, messages, hypertext, links, script, or other materials; and (ii) all metadata; and for greater certainty, Your Content includes Your ID, but only to the extent Your ID is contained in Your Videos. You represent that Your YouTube Channels are as follows:&nbsp;</span><span style="font-size:12px;font-family:Times;background:white;">YouTube Account link will be provided. (No payments will be made until link is provided and partnership accepted.)</span><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.35pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(gg)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Your Revenue</strong>&rsquo; means the amounts owing to You in accordance with this Exhibit B.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:320.1pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(hh)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Your Videos</strong>&rsquo; means audio, visual and audio-visual content which You own, control, license, or to which You otherwise claim rights, during the &nbsp; Term of this Agreement, including all such content appearing on Your YouTube Channels, but excludes any such content which is specifically subject to a separate Content Provider Agreement between You and Create Music Group, whether entered into before or after the Effective Date.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;(ii)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lsquo;<strong>Your YouTube Channels</strong>&rsquo; means YouTube Channels which You own, control, license, or to which You otherwise claim rights, during the &nbsp;Term&nbsp;<br></br>&nbsp; of this Agreement, but excludes any such YouTube Channels which are specifically subject to a separate Content Provider Agreement between You and Create Music Group, whether entered into before or after the Effective Date. &nbsp;For the avoidance of doubt, at any time during the &nbsp; Term Term&nbsp;<br></br>&nbsp;, the Parties may confirm in writing (e.g. via email) the identity of all YouTube Channels added to the scope of this Agreement after the Effective Date (such YouTube Channels would be deemed Your YouTube Channels).</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p><strong><u><span style='font-size:12px;line-height:115%;font-family:"Times New Roman",serif;'><br></br>&nbsp;</span></u></strong></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><strong><u><span style='font-size:12px;line-height:115%;font-family:"Times New Roman",serif;'><span style="text-decoration: none;">&nbsp;</span></span></u></strong></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:center;'><strong><u><span style='font-size:12px;font-family:"Times New Roman",serif;'>EXHIBIT B-1 &ndash; YOUTUBE MUSIC SUBSCRIPTION SERVICE TERMS AND CONDITIONS</span></u></strong></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-top:0cm;margin-right:-1.0pt;margin-bottom:.0001pt;margin-left:5.0pt;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>1. &nbsp; &nbsp; &nbsp;&nbsp;<strong>Definitions</strong>. &nbsp;In addition to terms defined elsewhere in this Agreement, the terms below are defined as follows:</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:44px;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;'>&lsquo;<strong>Artwork</strong>&rsquo; means album artwork, cover art, other artist images and any associated materials related to Your Content provided to Create Music Group, or Google as Create Music Group&rsquo;s sublicensee, under this Agreement.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:44px;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;'>&lsquo;<strong>Art Track</strong>&rsquo; means a complete master sound recording that is played back to an End User with an accompanying image(s) that is, in each case, designated by the applicable record label (or by Google on such record label&rsquo;s behalf) using tools, including auto-generation tools, provided by Google.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:44px;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;'>&lsquo;<strong>Audio Match</strong>&rsquo; means any third-party audio determined by the System to match an ID File.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:44px;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;'>&lsquo;<strong>Music Subscription Service</strong>&rsquo; means the content streaming service made available to End Users on or through YouTube through paid subscriptions or other eligibility requirements as determined by Google from time to time.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:44px;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;'>&lsquo;<strong>Music Subscription Service Net Revenue</strong>&rsquo; for any period means the revenue earned and actually received by Create Music Group in such period from the distribution of Your Content on or through Music Subscription Service, less the following amounts charged, levied, paid or payable in relation to such revenue: (a) taxes (other than net income taxes) and other government levies; (b) applicable advertising-related rebates and commissions (including commissions due to employees or consultants of Create Music Group), if any; (c) amounts due to advertising providers, if any; (d) the Google Fee, if any (to the extent not deducted prior to Create Music Group&rsquo;s receipt of such revenue); (e) the Rights Fee, if any; and (f) amounts due to Create Music Group&rsquo;s content aggregators, if any.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:44px;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;'>&lsquo;<strong>Music Search Service</strong>&rsquo; means the Google owned, controlled or branded music recognition and identification service which, at the request of an End User, utilizes Audio Matching to identify Your Content.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:44px;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;'>&lsquo;<strong>System</strong>&rsquo; means certain tools and systems provided by Google intended to assist Create Music Group and/or You in the identification and management of audio, visual, and audio-visual works on YouTube and that enable Create Music Group and/or You to set usage policies for such works.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:44px;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;'>&lsquo;<strong>Your Art Tracks</strong>&rsquo; means an Art Track that is embedded with a complete Your Sound Recording.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;margin-left:44px;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-family:"Times New Roman",serif;'>&lsquo;<strong>Your Sound Recordings</strong>&rsquo; means Your Videos which consist of: (a) master sound recordings embodying a musical composition (or ID Files generated therefrom) delivered to Create Music Group or Google, as Create Music Group&rsquo;s sublicensee; (b) all sound recordings embedded within User Content on YouTube which match to such master sound recordings using the System; and (c) all sound recordings owned or controlled by You (embodying musical compositions), which are embedded within User Content that Create Music Group or You Claim using the System. &nbsp;For the avoidance of doubt, sound recordings embodied in Your Videos will be deemed to be part of Your Video, not Your Sound Recording.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.4pt;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>2. &nbsp; &nbsp; &nbsp;<strong>Music Subscription Service License</strong>. &nbsp;&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.4pt;text-indent:36.0pt;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>For the avoidance of doubt, the Parties hereby recognize that, pursuant to Section 4(c) of the General Terms and Conditions in Exhibit B of this Agreement, You grant to Create Music Group, and Google as Create Music Group&rsquo;s sublicensee, all the rights &nbsp;set forth in the aforementioned &nbsp;Section &nbsp;for the distribution &nbsp;of Your &nbsp; Content, &nbsp;and all sound recordings and compositions embodied therein, on or through the Music Subscription Service in the Territory.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-top:0cm;margin-right:3.25pt;margin-bottom:.0001pt;margin-left:5.0pt;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>3. &nbsp; &nbsp; &nbsp;<strong>Art Track Creation and Ownership.</strong>&nbsp;<br></br>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;You hereby authorize Create Music Group, and Google as Create Music Group&rsquo;s sublicensee, to create, on Your behalf, Your Art Tracks using Your Sound Recordings and other content (including lyrics). &nbsp;As between the Parties, You will own all right, title and interest in and to the Art Tracks (excluding any third party content independently included by Create Music Group, or Google as Create Music Group&rsquo;s sublicensee, in Your Art Tracks), which are hereby licensed to Create Music Group, and Google as Create Music Group&lsquo;s sublicensee, on an exclusive basis. &nbsp;Following the expiration or termination of the &nbsp;Term, Create Music Group&rsquo;s sole obligation with respect to the Art Tracks will be to cease distribution thereof; Create Music Group will not be required to deliver any of Your Art Track files or metadata to You. &nbsp; &nbsp;You will have no right to license or distribute Your Art Tracks to any third parties during the &nbsp;Term or following the expiration or termination of the &nbsp; Term. &nbsp;Further, You are not granted the right to claim User Content with Your Sound Recordings as Your Art Tracks hereunder. &nbsp; All Artwork and any other materials provided to Create Music Group, or Google as Create Music Group&rsquo;s sublicensee, by You is hereby approved for use in connection with Your Art Tracks. &nbsp;If Create Music Group, or Google as Create Music Group&rsquo;s sublicensee, selects alternative visual image(s) not provided to Create Music Group, or Google as Create Music Group&rsquo;s sublicensee, by You to use in connection with Art Track(s), such image(s) will be subject to Your approval, not to be unreasonably withheld or delayed. &nbsp;If You do not approve Create Music Group&rsquo;s or Google&rsquo;s (as Create Music Group&rsquo;s sublicensee) alternative visual image(s), You will use reasonable efforts to provide Create Music Group, or Google as Create Music Group&rsquo;s sublicensee, with comparable replacement images.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-right:3.3pt;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-top:0cm;margin-right:3.25pt;margin-bottom:.0001pt;margin-left:5.0pt;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>4. &nbsp; &nbsp; &nbsp;<strong>Artwork License</strong>. &nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-top:0cm;margin-right:3.25pt;margin-bottom:.0001pt;margin-left:5.0pt;text-indent:31.0pt;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>You hereby grant to Create Music Group, and Google as Create Music Group&rsquo;s sublicensee, a limited, non-exclusive, worldwide, royalty-free license to use Your Artwork for use in connection with the license granted under Section 2 of this Exhibit C. You will deliver Your Artwork to Create Music Group, or Google as Create Music Group&rsquo;s sublicensee, in accordance with Create Music Group&rsquo;s or Google&rsquo;s then- current specifications. &nbsp; As between Create Music Group and You, all use by Create Music Group, or Google as Create Music Group&rsquo;s sublicensee, of Your Artwork (including any goodwill associated therewith) will inure to Your benefit.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-top:0cm;margin-right:3.25pt;margin-bottom:.0001pt;margin-left:5.0pt;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>5. &nbsp; &nbsp; &nbsp;<strong>Audio Matching License</strong>.&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-top:0cm;margin-right:3.25pt;margin-bottom:.0001pt;margin-left:5.0pt;text-indent:31.0pt;'><span style='font-size:12px;font-family:"Times New Roman",serif;color:windowtext;'>&nbsp;You hereby grant to Create Music Group, and Google as Create Music Group&rsquo;s sublicensee, a limited, non-exclusive, worldwide, royalty-free license to use Your Reference Files and ID Files for Audio Matching in connection with the Music Search Service. &nbsp;At the request of End Users utilizing the Music Search Service, the System will compare ambient audio to the ID Files corresponding to Your References Files to identify Your Content contemporaneously with the ambient performance of such content. &nbsp;If the System detects an Audio Match, Google may provide the End User with an opportunity to purchase or listen to Your Content.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
<p><strong><u><span style='font-size:12px;line-height:115%;font-family:"Times New Roman",serif;'><br></br>&nbsp;</span></u></strong></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><strong><u><span style='font-size:12px;line-height:115%;font-family:"Times New Roman",serif;'><span style="text-decoration: none;">&nbsp;</span></span></u></strong></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><strong><u><span style='font-size:12px;font-family:"Times New Roman",serif;'><span style="text-decoration: none;">&nbsp;</span></span></u></strong></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:center;'><strong><u><span style='font-size:12px;font-family:"Times New Roman",serif;'>EXHIBIT B-2 &ndash; YOUTUBE AUDIOSWAP LIBRARY TERMS AND CONDITIONS</span></u></strong></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-top:0cm;margin-right:-1.0pt;margin-bottom:.0001pt;margin-left:5.0pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">1. &nbsp; <strong>Definitions</strong>. &nbsp;In addition to terms defined elsewhere in this Agreement, the terms below are defined as follows:</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-family:Times;font-size:9.0pt;color:windowtext;">&lsquo;<strong>AudioSwap Library</strong>&rsquo; means the collection of sound recordings licensed to Google and made available to End Users for use with Google&rsquo;s AudioSwap Tools.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-family:Times;font-size:9.0pt;color:windowtext;">&lsquo;<strong>AudioSwap &nbsp;Library Net Revenue</strong>&rsquo; for any period means the revenue earned and actually received by Create Music Group in such period from the use and/or inclusion of AudioSwap Recordings in User Content, less the following amounts charged, levied, paid or payable &nbsp;in relation to such revenue: &nbsp;(a) taxes (other than net income taxes) and other government &nbsp;levies; (b) applicable advertising-related rebates and commissions (including commissions due to employees or consultants of Create Music Group), if any; (c) amounts due to advertising providers, if any; (d) the Google Fee, if any (to the extent not deducted prior to Create Music Group&rsquo;s receipt of such revenue); (e) the Rights Fee, if any; and (f) amounts due to Create Music Group&rsquo;s content aggregators, if any.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-family:Times;font-size:9.0pt;color:windowtext;">&lsquo;<strong>AudioSwap Recording</strong>&rsquo; means Your Sound Recordings (including the underlying compositions contained therein) which You desire to make available in the AudioSwap Library as communicated to Create Music Group, or Google as Create Music Group&rsquo;s sublicensee, by You in writing (e.g. via email).</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-family:Times;font-size:9.0pt;color:windowtext;">&lsquo;<strong>AudioSwap Tools</strong>&rsquo; means the tools made available by Google that allow End Users to synchronize songs from the</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-top:0cm;margin-right:74.95pt;margin-bottom:.0001pt;margin-left:36.0pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">AudioSwap Library with User Content upon the End User&rsquo;s request, including Google&rsquo;s video editing tools.</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-family:Times;font-size:9.0pt;color:windowtext;">&lsquo;<strong>AudioSwap Video</strong>&rsquo; means User Content that has been synchronized, in whole or in part, with an AudioSwap Recording at the request and direction of an End User by means of the AudioSwap Tools made available by Google.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-family:Times;font-size:9.0pt;color:windowtext;">&lsquo;<strong>System</strong>&rsquo; (if not already defined elsewhere in this Agreement) means certain tools and systems provided by Google intended to assist Create Music Group and/or You in the identification and management of audio, visual, and audio-visual works on YouTube and that enable Create Music Group and/or You to set usage policies for such works.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-left:36.0pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'>
  <ol style="margin-bottom:0cm;list-style-type: undefined;">
      <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-family:Times;font-size:9.0pt;color:windowtext;">&lsquo;<strong>Your Sound Recordings</strong>&rsquo; (if not already defined elsewhere in this Agreement) means: (a) master sound recordings embodying a musical composition (or ID Files generated therefrom) delivered to Create Music Group or Google, as Create Music Group&rsquo;s sublicensee, by You in digital form in connection with this Agreement; (b) all sound recordings embedded within User Content on YouTube which match to such master sound recordings using the System; and (c) all sound recordings owned or controlled by You (embodying musical compositions), which are embedded within User Content that Create Music Group or You Claim using the System. For the avoidance of doubt, sound recordings embodied in Your Videos will be deemed to be part of Your Video, not Your Sound Recording.</span></li>
  </ol>
</div>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-top:0cm;margin-right:3.3pt;margin-bottom:.0001pt;margin-left:5.0pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">2. &nbsp; &nbsp; <strong>AudioSwap License.</strong> &nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;margin-top:0cm;margin-right:3.3pt;margin-bottom:.0001pt;margin-left:5.0pt;text-indent:31.0pt;'><span style="font-size:12px;font-family:Times;color:windowtext;">Further to Section 4(c) of the General Terms and Conditions in Exhibit B of this Agreement, You grant to Create Music Group and Google as Create Music Group&rsquo;s sublicensee, all the rights set forth in the aforementioned Section for the use and/or inclusion of AudioSwap Recordings in User Content on a worldwide basis. &nbsp;Such grant of rights includes the right to remix, edit, adapt, and create derivative works based upon the AudioSwap Recordings solely to the extent necessary to utilize the AudioSwap Tools. &nbsp;The right to make AudioSwap Recordings available in the AudioSwap library is limited to the Term of this Agreement, provided, however, once an AudioSwap Recording is fixed within an AudioSwap Video, the license with respect to such AudioSwap Recording in such AudioSwap Video is irrevocable and will apply in perpetuity (or for the full period of copyright thereof) on a worldwide basis. &nbsp; &nbsp;AudioSwap Recordings will be set to a default usage rule of &lsquo;Monetize&rsquo;, provided, in the event of termination or expiration of the rights granted herein, You will no longer have the ability to monetize such AudioSwap Videos.&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:center;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;text-align:justify;'><span style='font-size:12px;font-family:"Times New Roman",serif;'>&nbsp;</span></p>
<p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;color:black;'><span style="font-size:12px;font-family:Times;color:windowtext;">&nbsp;</span></p>

</div>`;
  function getSingleTrack(id) {
    const { id: trackId, title,stream_income_share,isrc } = tracks.filter((track) => track.id === id)[0];
    return { trackId,title, stream_income_share,isrc};
  }
  useEffect(() => {
    const selecttacts = selected.map((e) => getSingleTrack(e));
    SetdocxData(selecttacts);
  }, [selected])
  const handleChange =(e, editor)=>{
    props.SetdocumentData(editor.getData())
  }
  return (
    <Grid container spacing={2} className={classess.page}>
      <Grid item sm={12} lg={12} xl={12} className={classess.page__details}>
        <Box
          varient="div"
          component="div"
          className={classess.page__details__box}
        >
           
           <Box
            varient="div"
            component="div"
            className={classess.page__details__box__tracks}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__details__box__tracks__header}
            >
              <span
                className={classess.page__details__box__adetails__header__title}
              >
                Contract Preview
              </span>
            </Box>
            <Box
              varient="div"
              component="div"
              className={classess.page__details__box__tracks__contract}
            >
               <div className="App">
                <CKEditor
                    editor={ Editor }
                    config={ editorConfiguration }
                    data={setdata}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                      handleChange(event,editor)
                      
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
              {/*
              <div>
                <h4>DISTRIBUTION AGREEMENT</h4>
                <p>
                  This DISTRIBUTION AGREEMENT (the ‘Agreement’) made and entered
                  into as of {todayDate} (the ‘Effective Date’), by and between
                  Create Music Group, Inc., with offices at 1320 N. Wilton Pl,
                  Los Angeles, CA 90028 (‘Licensee’ or ‘Create Music Group’)
                  -and {contract?.legel_name} with an address at{" "}
                  {contract?.recipient_address},
                  {contract?.city} , {contract?.zip_code} ,
                  {contract?.country} (‘Licensor’ or ‘you’) for the
                  licensing of certain Master Recording(s) (as defined herein),
                  as recorded by the recording artist{" "}
                  {contract?.artist_name} (&apos;Artist&apos;) .
                </p>
                <p>
                  In consideration of the mutual promises and covenants herein
                  contained including, without limitation, all promises and
                  covenants contained in Exhibit A and Exhibit B attached hereto
                  and incorporated herein by this reference, the parties hereby
                  agree as follows:
                </p>
                <p>
                  1. Term & Collection Period. 1. The term of this Agreement
                  (the &apos;Term&apos;) shall commence upon the Effective Date
                  ({todayDate}) and shall continue for ({props.contract_length}) year following
                  the initial commercial release date of each recording covered
                  by this agreement. Notwithstanding the above, the term of the
                  contract may be extended, despite the notice of termination
                  being rendered by, and over the objection of, Licensor,
                  subject to the provisions of Section 6, paragraph c below. The
                  Agreement shall automatically renew for successive and
                  consecutive one (1) year periods until terminated by either
                  party by either party providing notice to the other at least
                  60 days prior to the end of the applicable initial Term or
                  renewal period. (b) The ‘Collection Period’ (as used herein)
                  shall mean the period commencing upon the expiration or
                  termination of the Term and continuing for one (1) year.
                </p>
                <p>
                  2. Delivery, Promotional and Clearance Obligations of
                  Licensor. (a) Licensor will not ‘sample’ or otherwise
                  incorporate into the Master Recording(s) (‘Sample’ or
                  ‘Sampling’) any copyrighted or otherwise proprietary material
                  (including, without limitation, copyrighted master recordings
                  and musical compositions) owned, composed and/or controlled by
                  any third person or entity without having first obtained
                  Licensee’s prior written approval of such Sample. The
                  inclusion of any Samples in the Master Recording(s) shall be
                  subject to both Licensee’s approval of the terms of the
                  applicable clearance agreement for such Sample and the full
                  execution of such clearance agreement. (b) Licensor shall be
                  solely responsible for clearing the use of all third-party
                  materials used in the Master Recording(s) and promotional
                  materials (including musical compositions). Upon Licensee’s
                  request, Licensor shall provide copies of its licenses of such
                  third-party materials. Licensor hereby warrants and represents
                  that all information supplied by Licensor to Licensee in that
                  regard is and shall be complete and correct. Without limiting
                  the foregoing, no Master Recording(s) will be scheduled for
                  release until a written license for the use of each such
                  Sample in any and all media has been obtained by Licensor, at
                  Licensor or Artist’s sole expense, and approved by Licensee.
                  (c) During the Term, Licensor shall exclusively deliver to
                  Licensee the following studio master recordings (the “Master
                  Recordings”) embodying musical compositions (the
                  “Compositions”) that are satisfactory and acceptable to
                  Licensee in its sole discretion: 1. any and all Master
                  Recordings listed on Schedule A; 2. any other Master
                  Recordings delivered by Licensor to Licensee during the Term
                  in Licensor’s sole and absolute discretion 3. Intentionally
                  Deleted. 4. Intentionally deleted. (d) Intentionally Deleted.
                  (e) Intentionally Deleted.
                </p>
                <p>
                  3. Rights Granted. (a) Licensor grants Licensee (together with
                  its affiliates, vendors and third distribution partners) the
                  Exclusive right and license during the Term and throughout the
                  world and Universe (‘Territory’) to: distribute, transmit,
                  make derivative works from (including, without limitation, to
                  transcode and stream audio-only files and to create
                  promotional materials), publicly perform and exhibit, and
                  otherwise promote and exploit the Master Recording(s) via
                  vinyl record, compact disc, Internet, mobile, streaming, and
                  any media now known or hereafter devised. The format and
                  timing of commercial release of the Master Recordings shall be
                  determined by Licensee in its sole discretion. (b) During the
                  Term, Licensee shall be Licensor’s Exclusive distributor of
                  the Master Recording(s), except as it pertains to
                  synchronization licensing which shall be non-exclusive;
                  accordingly, Licensor grants Licensee the non-exclusive right
                  and license during the Term and within the Territory to issue
                  synchronization licenses for the Master Recording(s). (c)
                  Licensor grants to Licensee the exclusive right and license,
                  during the Term and Collection Period, to collect all monies
                  earned from exploitations of the Master Recording(s) that
                  occur prior to or during the Term, specifically in connection
                  with rights granted hereunder including, without limitation,
                  neighboring rights income. For the avoidance of doubt, the
                  foregoing exclusive right shall not apply: (i) in connection
                  with synchronization licenses entered into directly by
                  Licensee, or (ii) the so-called ‘Artist’s share’ of
                  neighboring rights income (as opposed to the so-called ‘master
                  owner’s share,’ which Licensor shall be entitled to collect),
                  including, without limitation from SoundExchange. Licensee
                  shall not have the right to collect any monies earned from
                  exploitations of the Master Recording that occur after the
                  expiration of the Term. (d) Licensor grants to Licensee during
                  the Term the exclusive right to use Artist’s name and likeness
                  in connection with the exploitation of the Master Recordings.
                  1. Licensor grants to Licensee all of the rights provided in
                  Exhibit A and Exhibit B attached hereto and incorporated
                  herein by this reference and hereby agrees to be bound by all
                  covenants and obligations contained therein. 3B. Intentionally
                  Deleted. 3C. Pitching Rights. (a) During the Term, Licensor
                  grants to Licensee, with respect to the Master Recordings and
                  Artist and/or Licensor’s pro-rata ownership interest in and to
                  the underlying Compositions, the Exclusive right to pitch,
                  secure, negotiate, enter into and administer synchronization,
                  master use, and other related licenses (and collect all
                  related monies) for the Master Recordings and/or Compositions
                  for exploitation in all areas of audio-only and audiovisual
                  broadcast media, including without limitation, soundtracks,
                  all forms of TV (including free TV, cable of all types,
                  satellite, direct broadcast and any other types of
                  &apos;television&apos;), advertising, home video, video games,
                  the internet, and mobile (collectively &apos;Pitching
                  Rights&apos;). Licensee’s rights to collect monies shall
                  include the right to collect any sums for extensions and/or
                  replacements of any applicable licenses, option fees,
                  advances, and royalties (excluding, residuals, SAG and AFTRA
                  monies, if any). Licensee shall have the right to advertise
                  and publicize itself as Artist’s and/or Licensor’s licensing
                  agent in connection with the Master Recordings and/or
                  Compositions, and Licensee may include Artist’s and/or
                  Licensor’s name, approved likeness, approved biographical
                  material in mailings and promotional materials, if any. (b)
                  Notwithstanding anything to the contrary contained herein and
                  for the avoidance of doubt: (i) Pitching Rights refers solely
                  to the right to procure and administer licenses for the Master
                  Recordings and/or Compositions, and Licensee is granted no
                  rights (including, without limitation, ownership rights) in
                  and to Artist’s and/or Licensor’s pro-rata interest in and to
                  the Master Recordings and/or Compositions, other than Pitching
                  Rights granted pursuant to this agreement; and (ii) the right
                  of Licensee to administer and collect with respect to the
                  licensed use of any Master Recording and/or Composition, shall
                  be as set forth in the respective third-party license
                  governing such use, and is separate and apart from the Term of
                  this Agreement. (c) With respect to the Pitching Rights,
                  Licensee and/or Licensee’s designee shall credit to Licensor
                  50 percent (50%) of Pitching Net Revenue (as defined below)
                  deriving from licensing opportunities presented and/or secured
                  by Licensee and/or Licensee’s designee. &apos;Pitching Net
                  Revenue&apos; means all revenues actually received by Licensee
                  in connection with the Pitching Rights (excluding, for the
                  avoidance of doubt, any sums paid to, or retained by, a
                  collective rights organization, arm’s length trustee, or an
                  agent for the licensing of the Compositions) (&apos;Gross
                  Sums&apos;), less actual, third-party out-of-pocket costs
                  incurred by Licensee in connection with the Pitching Rights.
                </p>
                <p>
                  4. Revenue Share. (a) Licensee shall pay Licensor (or credit
                  to Licensor’s account, as applicable) the following
                  percentages of Net Revenue. ‘Net Revenue’ as used herein shall
                  mean gross revenue actually received by Licensee pursuant to
                  this Agreement, less any and all of Licensee’s direct,
                  non-overhead, unreimbursed costs and expenses which are
                  directly attributable the rights granted hereunder including,
                  without limitation, costs related to manufacturing, all
                  related commissions and royalties payable by Licensee to any
                  third parties (including without limitation, collection
                  societies and agents (e.g., for the securing of placements)),
                  studio costs, recording costs, design, artwork, packaging,
                  shipping, distribution, storage, insurance, collection costs,
                  union fees, production costs, costs of advertising, marketing
                  or promotion, third party merchant costs (e.g. credit card,
                  PayPal, or currency conversion costs), professional fees
                  attributable to the rights granted hereunder (e.g., legal or
                  accounting) and any and all other monies reasonably spent in
                  connection with the rights granted hereunder: 1. Digital Phono
                  Record Delivery (i.e., electronic downloads): 80% 2. Streaming
                  through audio (e.g., Spotify) and audio-visual (e.g. YouTube)
                  distributors: 80% 3. Synchronization licenses: 50% (iv)
                  Intentionally deleted. (vi) Intentionally deleted. (vi) Any
                  other Net Revenue, including without limitation, neighboring
                  rights income: 80% (b) “Recoupable Expenses” as used herein
                  shall mean any and all direct, non-overhead, unreimbursed
                  costs and expenses paid by or on behalf of Licensee which are
                  directly attributable to the rights granted hereunder,
                  including, without limitations, costs related to
                  manufacturing, packaging, shipping, storage, design, artwork,
                  advertising, marketing, promotion, insurance, union fees,
                  production costs, studio costs, recording costs, all related
                  royalties payable by Licensee to any third parties (including,
                  without limitation, third-party royalty participants such as
                  producers, mixers, etc.), and any and all other monies
                  reasonably spent by or on behalf of Licensee in connection
                  with the rights granted hereunder or which Licensor asks or
                  requests that Licensee pay on Licensor’s behalf; provided
                  that, for the avoidance of doubt, any and all Recoupable
                  Expenses shall be deemed recoupable advances hereunder and
                  shall be recoupable from Licensor’s share of Net Revenue and
                  the Channel Partnership Royalties (all of which shall be
                  &apos;cross-collateralized&apos;), as well as any monies
                  payable by Licensee to Licensor in connection with any other
                  executed agreements between the parties, and shall not, for
                  the avoidance of doubt, be deemed “off the top” expenses to be
                  deducted from gross revenue in the calculation of Net Revenue
                  hereunder. (c) For the avoidance of doubt, Licensor’s revenue
                  share above shall be inclusive of all mechanical royalties due
                  in connection with the sales of the Master Recordings and
                  Licensor shall remain solely responsible for securing all
                  mechanical licenses and making all payments required
                  thereunder, with respect to the Compositions embodied in
                  Master Recording hereunder (other than for any In-House Talent
                  (as defined below)). Further, for the avoidance of doubt, to
                  the extent Licensee makes any payment(s) with respect to such
                  mechanical licenses or mechanical royalties, such payments
                  shall be deemed Recoupable Expenses hereunder. (d)
                  Notwithstanding the foregoing, Licensee may retain for its own
                  account any and all revenue payable to any In-House Talent
                  subject to the terms of Licensor’s or Licensee’s agreement
                  with same. As used herein, “In-House Talent” shall mean any
                  producer, artist, songwriter, mixer or other performer whose
                  applicable rights are administered, owned, controlled or
                  furnished by Licensee. For avoidance of doubt such withholding
                  by Licensee shall include, by way of illustration, producer
                  royalties, producer profit share, and/or mechanical royalties
                  due to any In-House Talent that is a producer or songwriter.
                </p>
                <p>
                  5. Accounting, and Audit Rights. (a) Licensee shall, on a
                  monthly basis within thirty (30) days after the end of each
                  calendar month, (i) render a statement detailing the unit
                  sales, Net Revenue, and adjustments and (ii) pay Licensor its
                  share of Net Revenue hereunder, less any withholdings required
                  by U.S. tax law. Licensee shall not be required to make the
                  foregoing accounting if Licensor’s share of Net Revenue for
                  any given monthly period does not exceed one hundred dollars
                  ($100). Licensee may make adjustments for chargebacks and
                  refunds and shall have the right to maintain reasonable
                  reserves against returns and other adjustments, and shall
                  liquidate such reserves in accordance with its reasonable
                  practices, but in no event shall Licensee be required to
                  liquidate any reserve until the applicable distributor
                  liquidates the corresponding reserve. Licensee shall have the
                  absolute right in accounting to Licensor to rely upon the
                  statements received by Licensee from applicable distributors
                  and income sources and Licensee shall not be responsible in
                  any manner for any error, omission or other inaccuracy of any
                  such statement. Royalties for records sold for distribution
                  outside of the United States of America shall be computed in
                  the national currency in which License is paid by its
                  Licensees and shall be paid to Licensor at the same rate of
                  exchange at which Licensee is paid. (b) Notwithstanding the
                  foregoing, Licensee has no duty to pay Licensor its share of
                  Net Revenue pursuant to this Agreement, until any recoupable
                  advances paid to Licensor have been fully recouped. If
                  Licensee pays any advances or mutually-approved expenses, fees
                  or other payments to Licensor or on Licensor’s behalf (such
                  as, for example, any approved third party marketing, promotion
                  or advertising costs) and any such monies paid by Licensee
                  have not been fully recouped as of the date of Licensor’s
                  written notice requesting a termination of the Term, Licensee
                  may extend the Term beyond the scheduled termination or
                  expiration date through the last day of the calendar month in
                  which all such costs and any other amounts due and owing to
                  Licensee are fully recouped. No other forms of compensation
                  shall be due to Licensor from Licensee for the rights granted
                  herein, including but not limited to mechanical or public
                  performance royalties. (c) All statements rendered by Licensee
                  to Licensor pursuant to the above subparagraph 5(a) and all
                  other accounts, shall be binding upon Licensor and not subject
                  to any objection by Licensor for any reason unless specific
                  objection in writing, stating the basis thereof, is given to
                  Licensee within twelve (12) months from the date rendered.
                  Licensor shall be foreclosed from maintaining any action,
                  claim or proceeding against Licensee in any forum or tribunal
                  with respect to any statement or accounting due hereunder
                  unless such action, claim or proceeding is commenced against
                  Licensee in a court of competent jurisdiction within two (2)
                  years after the date such statement or accounting is rendered;
                  after such date such statement shall be binding. If Licensor
                  commences suit on any controversy or claim concerning Net
                  Revenue accountings rendered to Licensor under this Agreement
                  in a court of competent jurisdiction, the scope of the
                  proceeding will be limited to determination of the amount of
                  the Net Revenue due for the accounting periods concerned, and
                  the court will have no authority to consider any other issues
                  or award any relief except recovery of any royalties found
                  owing. Licensor’s recovery of its share of such Net Revenue
                  will be the sole remedy available to Licensor by reason of any
                  claim related to Licensor’s royalty accountings. Without
                  limiting the generality of the preceding sentence, Licensor
                  will not have any right to seek termination of this Agreement
                  or avoid the performance of Licensor’s obligations under this
                  Agreement by reason of any such claim. (d) At any time within
                  twelve (12) months after any royalty statement is rendered to
                  Licensor hereunder, Licensor shall have the right to give
                  Licensee written notice of its intention to examine Licensee’s
                  books and records with respect to such statement. Such
                  examination shall be commenced and completed within six (6)
                  months after the date of such notice, at Licensor’s sole cost
                  and expense, by any certified public accountant, provided he
                  or she is not then engaged in an outstanding examination of
                  Licensee’s books and records on behalf of a person other than
                  you. Such examination shall be made during Licensee’s usual
                  business hours at the place where Licensee maintains the books
                  and records which relate to the rights hereunder and which are
                  necessary to verify the accuracy of the statement or
                  statements specified in Licensor’s notice to Licensee and the
                  examination shall be limited to the foregoing. Licensor’s
                  right to inspect such books and records shall be only as set
                  forth in this paragraph and Licensee shall have no obligation
                  to produce such books and records more than once with respect
                  to each statement rendered to Licensor. Licensor shall cause
                  Licensor’s accountant to deliver a copy of his or her audit
                  report to Licensee within three (3) months after the
                  completion of said accountant&apos;s examination of
                  Licensee&apos;s books and records. Licensor acknowledges that
                  Licensee’s books and records contain confidential trade
                  information. Neither Licensor nor its representatives will
                  communicate to others or use on behalf of any other person any
                  facts or information obtained as a result of such examination
                  of Licensee’s books and records. The rights granted herein to
                  Licensor constitute Licensor’s sole right to examine
                  Licensee&apos;s books and records.
                </p>
                <p>
                  6. Termination. Licensee may terminate the Term immediately:
                  (a) in the event of any material breach of this Agreement by
                  Licensor; (b) in the event that Licensor makes a general
                  assignment for the benefit of its creditors; (c) in the event
                  of the filing of a voluntary or involuntary petition against
                  Licensor under any applicable bankruptcy or insolvency law,
                  provided, that Licensor will have a period of ninety (90)
                  consecutive days from its receipt of any involuntary petition
                  in bankruptcy filed against Licensor in which to cure before
                  Licensee may terminate the Term pursuant to this clause 8(c);
                  or (d) in the event of the appointment of a trustee or
                  receiver or any equivalent thereof for the Licensor or its
                  property. The termination or expiration of the Term will not
                  affect those representations, warranties and other obligations
                  that by their nature survive the end of the Term. Otherwise,
                  the Agreement shall automatically renew for successive and
                  consecutive one (1) year periods until terminated by either
                  party by either party providing notice to the other at least
                  60 days prior to the end of the applicable initial Term or
                  renewal period.
                </p>
                <p>
                  7. Representations and Warranties. (a) You warrant and
                  represent that it: (i) is an entity duly formed and/or
                  organized and validly subsisting pursuant to the laws of its
                  jurisdiction of formation and/or organization; that this
                  Agreement has been executed by a duly authorized
                  representative; and that it has the right, power and authority
                  to enter into this Agreement and to fully perform its
                  respective obligations hereunder. (b) Licensor further
                  warrants and represents that: (i) No materials, ideas or other
                  properties furnished by Licensor and embodied or contained in
                  or used in connection with the Master Recording(s) shall
                  violate any law or infringe upon any common law or statutory
                  rights of any party, including without limitation, contractual
                  rights, copyrights and rights of privacy. Without limiting the
                  generality of the foregoing, Licensor specifically represents
                  and warrants that (A) Licensor has obtained (or will obtain,
                  as applicable) all necessary consents, permissions and
                  clearances including, without limitation, from all persons
                  whose appearances, names, voices or likenesses are contained
                  in the Master Recording(s) and any promotional materials; (B)
                  As between Licensee and Licensor, Licensor has or will at its
                  own expense obtain and, to the extent required, pay for all
                  necessary performing rights from the copyright owners of the
                  Master Recording(s) and such other persons, firms or
                  associations, societies or corporations as may own or control
                  the performing rights thereto; (C) Licensor will not make any
                  agreements with or representations to any guilds or unions or
                  other third parties (including, without limitation, the
                  Artists performing in the Master Recording(s) which would
                  obligate Licensee to make any future payments to any third
                  parties in connection with Licensee’s exercise of the rights
                  herein granted to Licensee; (D) Licensor owns or controls, and
                  shall own and control, the rights necessary to make the grants
                  of rights, licenses and permissions hereunder and necessary
                  for Licensee to freely exploit the Master Recording(s), any
                  promotional materials, and rights granted to it herein to
                  effect the purpose of the Agreement, without the need for any
                  licenses, releases, consents, approvals not granted herein or
                  the requirement to make any payments of any nature to any
                  person (excluding solely the obligation to pay Licensor’s
                  share of Net Revenue in the manner described herein); (E) the
                  Master Recording(s) and any promotional materials do not and
                  will not (I) infringe on the proprietary or intellectual
                  property rights of any third party, including, without
                  limitation, copyrights, trademark rights and rights of
                  publicity and privacy or (II) violate any applicable laws
                  (including without limitation the laws and regulations
                  governing export control, unfair competition,
                  anti-discrimination or false advertising); (F) Licensor is not
                  aware that any third party claim has been made or threatened
                  with respect to the Master Recording(s) or any promotional
                  materials. (ii) Any metadata provided by Licensor shall be
                  complete and accurate and will confirm to all of Licensee’s
                  parameters for metadata and content specifications as provided
                  by Licensee. (iii) All of Licensor’s representations and
                  warranties shall be true and correct upon execution hereof and
                  shall remain in effect for so long as Licensee, its licensees,
                  assignees, transferees or successors in interest have any
                  rights in or to the Master Recording(s). Licensee’s acceptance
                  of the Master Recording(s) or other materials hereunder shall
                  not constitute a waiver of any of Licensor’s representations,
                  warranties or agreements in respect thereof. (iv) Licensee
                  shall not be required to make any payments of any nature for
                  or in connection with the acquisition, exercise or
                  exploitation of any rights granted to Licensee hereunder,
                  except as specifically provided in this Agreement. (v)
                  Licensor shall execute and deliver to Licensee, upon
                  Licensee&apos;s request therefor, any documents as may be
                  required by Licensee to effectuate the intent of this
                  Agreement, including, without limitation, any so-called
                  ‘inducement letters’. If Licensor shall fail or refuse to
                  execute and deliver any such inducement letter promptly
                  following Licensee&apos;s request therefor, Licensor hereby
                  appoints Licensee as Licensor’s true and lawful
                  attorney-in-fact to execute such inducement letter(s) in
                  Licensor’s name and on Licensor’s behalf. Such power of
                  attorney is irrevocable and is coupled with an interest.
                </p>
                <p>
                  8. Indemnification. Each party hereto (for these purposes,
                  ‘Indemnitor’) shall indemnify, defend and hold the other party
                  (‘Indemnitee’) harmless against and in respect of any claims,
                  losses, damages or expenses (including, without limitation,
                  reasonable attorneys&apos; fees and litigation costs), that
                  Indemnitee may incur, which arise from or relate to any
                  alleged breach of, or failure by Indemnitor to perform, any of
                  Indemnitor&apos;s representations, warranties, or promises in
                  this Agreement or in any schedule, certificate, exhibit, or
                  other instrument furnished or to be furnished by Indemnitor
                  under or in connection with this Agreement. It is understood
                  that Indemnitor’s obligation to indemnify and defend pursuant
                  to this paragraph shall subsist regardless of whether
                  Indemnitor defeats the claim or the claim results in an
                  adverse judgment or settlement. Indemnitee shall notify
                  Indemnitor of any claim presented to Indemnitee by a third
                  party. Indemnitor shall defend any third-party claim, at its
                  sole expense, with counsel approved by Indemnitee, except
                  that, at Indemnitee&apos;s option, Indemnitee may defend the
                  claim (at Indemnitor&apos;s sole expense) and shall consult
                  with Indemnitor about choice of counsel and the conduct of the
                  proceeding. No such claim asserted by a third party may be
                  settled by Indemnitee without Indemnitor&apos;s prior written
                  consent (such consent not to be unreasonably withheld or
                  delayed), so long as Indemnitee is actively defending such
                  claim in a manner consistent with industry norms, unless
                  Indemnitee shall agree not to seek indemnity from Indemnitor
                  for any settlement payment made by Indemnitee to the claimant
                  and further subject to the following. If Indemnitor does not
                  approve a settlement proposed by Indemnitee, Indemnitee may
                  nonetheless settle the matter unless, within ten (10) business
                  days after notice to Indemnitor, Indemnitor furnishes to
                  Indemnitee a surety bond or letter of credit from a national
                  surety company or bank, in form and content satisfactory to
                  Indemnitee, insuring Indemnitee against the amount of the
                  claim in addition to reasonable attorney&apos;s fees and
                  litigation costs expended in connection with the claim and a
                  reasonable estimate of such fees and costs required to
                  continue the defense. If any claim shall be lodged with
                  Licensee or any action commenced having as its basis a claim
                  which, if proved, would constitute a breach by Licensor of any
                  of Licensor’s representations, warranties, or covenants
                  contained herein, Licensee, in addition to any other right or
                  remedy otherwise available, shall have the right to control
                  the defense thereof and settle same (subject to the above)
                  and, additionally, may withhold from any payments otherwise
                  due to Licensor hereunder an amount equivalent to that claimed
                  or sued for plus reasonable costs and attorney&apos;s fees
                  relating thereto. Any amount so withheld shall be credited to
                  Licensor’s account when Licensor shall have received
                  reasonable assurances that the claim or action has been
                  finally settled or fully adjudicated and the judgment
                  satisfied, or that the statute of limitations on such claim
                  has run, or when reasonable and adequate security for the
                  claim has been provided to Licensee.
                </p>
                <p>
                  9. Limitation of Liability. To the maximum extent permitted by
                  applicable law, in no event will Licensee be liable to
                  Licensor for any loss of use, data, goodwill, revenues, or
                  profits (whether or not deemed to constitute a direct loss),
                  or any consequential, special, indirect, incidental, punitive,
                  or exemplary loss, damage or expense of any kind arising out
                  of or in any way related to the Master Recordings, the Content
                  (as defined herein), or this Agreement, even if foreseeable or
                  even if Licensee has been advised or should have known of the
                  possibility of such damages. Licensee assumes no
                  responsibility for the downtime of Licensee’s CMS or
                  computers, Licensor’s network, or for the loss of information,
                  data records, or the Content. In no event will Licensee’s
                  total liability to Licensor for all damages, losses or causes
                  of action exceed the total amount of all types of revenue
                  actually received and retained by Licensee in the three (3)
                  months prior to the event which gave rise to the liability,
                  after deducting therefrom amounts paid or due to you in
                  respect thereof.{" "}
                </p>
                <p>
                  10. Relationship & Taxes. (a) Licensor and Licensee hereby
                  acknowledge and agree that their relationship is strictly and
                  solely that of independent contractors, and that neither
                  Licensor nor any of Licensor’s employees, agents or
                  representatives is or shall be construed as an employee of
                  Licensee, or otherwise entitled to any benefits or insurance
                  provided by Licensee, including any unemployment or disability
                  benefits. Nothing contained herein shall grant Licensor any
                  right, power or authority to bind the Licensee to any
                  obligations. (b) Each party hereto will be responsible for
                  collecting and remitting any and all applicable taxes due with
                  respect to (or incurred in connection with) the sale or
                  license of such party’s goods or services to its customers.
                  Except as expressly set forth below, neither party will be
                  liable for any taxes, duties, levies, fees, excises or tariffs
                  incurred in connection with or related to the sale of the
                  other party’s goods or services. Notwithstanding the forgoing
                  or anything elsewhere in this Agreement, any and all monies
                  payable to Licensor hereunder will be reduced by all
                  applicable sales, use, excise, purchase, value-added or
                  similar taxes properly due and paid or payable by Licensee and
                  its affiliates to taxing authorities with appropriate
                  jurisdiction. If any amounts are required under law to be
                  withheld from any payments to Licensor under this Agreement,
                  Licensee will be entitled to withhold such amounts. Nothing
                  contained herein shall grant Licensor any right, power or
                  authority to bind the Licensee to any obligations.
                </p>
                <p>
                  11. Confidentiality. Neither party (the ‘Receiving Party’)
                  will disclose the terms of this Agreement or any Confidential
                  Information (as defined herein) of the other party (the
                  ‘Disclosing Party’) to any third-party except: (a) as may be
                  required by any court of competent jurisdiction, governmental
                  agency, law or regulation (in such event, the Receiving Party
                  shall notify the Disclosing Party before such disclosure so as
                  to give the Disclosing Party an opportunity to apply for a
                  confidentiality order or similar remedy); (b) as part of the
                  normal reporting or review procedure to the Receiving Party’s
                  accountants, auditors, employees, legal counsel, and employees
                  of partners, parent and subsidiary need to know to perform
                  their regular responsibilities to the Receiving Party may be
                  disclosed to such persons, and provided further that the
                  Receiving Party will be responsible to the Disclosing Party
                  for any unauthorized disclosure of Confidential Information by
                  them; (c) information which has entered the public domain
                  through no fault of the Receiving Party or any persons to whom
                  the Receiving Party has provided Confidential Information as
                  permitted hereunder; and (d) with the prior written consent of
                  the Disclosing Party. As used herein, ‘Confidential
                  Information’ shall mean the terms of this Agreement and any
                  non¬public information, data, usage reports, revenue reports,
                  Unauthorized Content (as defined herein) identification
                  techniques, Content Claiming (as defined in Exhibit A)
                  methods, or other materials provided by one party to the other
                  under or in connection with this Agreement (other than the
                  Content, promotional materials and other information intended
                  for storage and display to end users or prospective end users
                  under this Agreement) and any other information the receiving
                  party should reasonably have understood under the
                  circumstances should be treated as confidential, whether or
                  not the specific designation ‘confidential’ or any similar
                  designation is used, such as royalty statements and similar
                  information. Neither party shall use any Confidential
                  Information except as necessary for the express purpose of
                  carrying out its respective obligations under this Agreement.
                  The terms of this paragraph 11 shall survive the expiration or
                  termination of the Agreement.
                </p>
                <p>
                  12. Notice. Any notice permitted or required under Agreement
                  will be delivered in person, by United States certified mail
                  with return receipt requested, or via overnight delivery (to
                  the addresses on page one hereof) or via email as set forth in
                  the next sentence. All submissions to be sent to Licensor
                  pursuant to subparagraph 1(b) of Exhibit A may also be sent by
                  email in lieu of physical submissions to{" "}
                  {contract?.artist_email}, and all submissions to be
                  sent to Licensee pursuant to subparagraph 1(b) of Exhibit A
                  may also be sent by email in lieu of physical submissions to
                  youtube.issues@createmusicgroup.com. All notices to Licensee
                  shall be copied to Boyarski Fritz LLP, 1330 Avenue of the
                  Americas, Suite 1800, New York, NY 10019, Attn: Jason
                  Boyarski, Esq. (or by email to jboyarski@boyarskifritz.com).
                  If such notice or demand is served personally, notice shall be
                  deemed constructively made at the time of such personal
                  service. If such notice, demand or other communication is
                  given by mail, such notice shall be conclusively deemed given
                  three (3) days after deposit thereof in the United States mail
                  addressed to the party to whom such notice, demand or other
                  communication is to be given at the address set forth at the
                  head of this Agreement or such other address as such party
                  shall have given written notice of to the other party in
                  accordance herewith.
                </p>
                <p>
                  13. Credit. Licensee shall accord Licensor an appropriate
                  credit in connection solely with the initial release of the
                  Master Recording(s) hereunder. Licensee&apos;s inadvertent
                  failure to comply with any of its obligations under this
                  paragraph 13 shall not be deemed a breach of this Agreement.
                  Each party may issue a press release concerning the existence
                  of this Agreement with the other party’s prior approval, not
                  to be unreasonably withheld.
                </p>
                <p>
                  the other party’s prior approval, not to be unreasonably
                  withheld. 14. Miscellaneous. 1. Merger. The terms set forth in
                  this Agreement and all exhibits and attachments hereto,
                  constitute the entire understanding between Licensee and
                  Licensor with respect to the subject matter hereof, all prior
                  and/or contemporaneous negotiations and understandings being
                  merged herein. This Agreement cannot be canceled, modified,
                  amended or waived, in part or in full, in any way except by an
                  instrument in writing signed by the party to be charged. 1.
                  Severability. In the event any one or more of the provisions
                  of this Agreement is invalid or otherwise unenforceable, the
                  enforceability of remaining provisions shall be unimpaired. If
                  any provision of this agreement, or any part thereof, is found
                  to be invalid or unenforceable, the same shall not affect the
                  remaining provisions, which shall be given full effect,
                  without regard to the invalid portions. Moreover, if any one
                  or more of the provisions contained in this agreement shall be
                  held to be excessively broad as to duration, scope, activity
                  or subject, such provisions shall be construed by limiting and
                  reducing them so as to be enforceable to the maximum extent
                  with applicable law. (c) Headings. The headings of the
                  articles and sections used in this Agreement are included for
                  convenience only and are not to be used in construing or
                  interpreting this Agreement. (d) Modification; Waiver; Rights
                  and Remedies. No waiver by Licensee or Licensor whether
                  express or implied, of any provision of this Agreement or any
                  default hereunder shall affect the other&apos;s right to
                  thereafter enforce such provision or to exercise any right or
                  remedy in the event of any other default, whether or not
                  similar. Those provisions of any applicable collective
                  bargaining agreement between Licensee and any labor
                  organization which are required, by the terms of such
                  agreement to be included in this Agreement shall be deemed
                  incorporated herein. (e) Invalid Provisions. Nothing in this
                  Agreement may be construed to require the commission of any
                  act contrary to laws; provided that, in the event there is a
                  conflict between any provisions of this Agreement and any law,
                  contrary to which the parties hereto have no legal right to
                  contract, (i) the provision of this Agreement so affected will
                  be limited only to the extent necessary to permit the
                  compliance with the minimum legal requirements, (ii) no other
                  provisions of this Agreement will be affected thereby, and
                  (iii) all such other provisions will remain in full force and
                  effect. The parties hereto will negotiate in good faith to
                  replace any invalid, illegal or unenforceable provision (the
                  ‘Invalid Provision’) with a valid provision, the effect of
                  which comes as close as possible to that of the Invalid
                  Provision. (f) Choice of Law and Venue. This Agreement shall
                  be governed by and construed under the laws and judicial
                  decisions of the State of California without giving effect to
                  the conflict of laws principles of California. All claims,
                  disputes or disagreements which may arise out of the
                  interpretation, performance or breach of this Agreement shall
                  be submitted exclusively to the jurisdiction of the state
                  courts of the State of California or the United States
                  District Courts located in Los Angeles; provided, however, if
                  Licensee is sued or joined in any other court or forum in
                  respect of any matter which may give rise to a claim by
                  Licensee hereunder, Licensor consents to the jurisdiction of
                  such court or forum over any such claim which may be asserted
                  by Licensee. (g) Non-Disparagement. Neither party will will
                  ridicule, disparage or demean the reputation of the other
                  Party. Nothing herein shall prevent the parties from making
                  any truthful statement in connection with any legal proceeding
                  or investigation by either Party or any governmental
                  authority. (h) Assignment. This Agreement will be binding upon
                  and inure to the benefit of the parties and their permitted
                  successors and assigns. Licensee may assign this Agreement to
                  any subsidiary, affiliated or controlling corporation, or to
                  any person owning or acquiring a substantial portion of the
                  stock or assets of Licensee. Licensee may also assign and/or
                  sublicense its rights hereunder to the extent necessary or
                  advisable in Licensee’s sole discretion to implement the
                  license granted or to any third-party assignee as set forth
                  herein. Licensor may not assign this Agreement or any of your
                  rights hereunder and any such purported assignment shall be
                  void. 1. Force Majeure. Neither party hereto will be
                  responsible for, or be in breach of this Agreement, to the
                  extent that its performance is frustrated or delayed as a
                  result of any act of God, war, terrorism, pandemic/epidemic,
                  fire, earthquake, civil commotion, act of government or any
                  other cause wholly beyond its control and not due to its own
                  negligence or that of its contractors or representatives, and
                  which cannot be overcome by the exercise of due diligence. 1.
                  Counterparts. This Agreement may be executed by digital
                  signature in one or more counterparts, via digital PDF copy,
                  each of which shall be an original; but such counterparts
                  shall together constitute but one and the same instrument. 1.
                  Cure. Neither party shall be in default of any term,
                  condition, or provision of this agreement unless and until the
                  other party gives written notice specifying such default in
                  detail and such default, if curable, shall not have been cured
                  within thirty (30) days after receipt of such notice. For the
                  avoidance of doubt, any breach by Licensor of its exclusivity
                  provisions hereunder shall not be a curable breach. Licensor
                  acknowledges and agrees that Licensor has read this Agreement
                  and have been advised by Licensee of the significant
                  importance of retaining an independent attorney of Licensor’s
                  choice to review this Agreement on Licensor’s behalf. Licensor
                  acknowledges and agrees that Licensor has had the unrestricted
                  opportunity to be represented by an independent attorney. In
                  the event of Licensor’s failure to obtain an independent
                  attorney or waiver thereof, Licensor hereby warrants,
                  represents and agrees that Licensor will not attempt to use
                  such failure and/or waiver as a basis to avoid any obligations
                  under this Agreement, or to invalidate this Agreement or to
                  render this Agreement or any part thereof unenforceable. IN
                  WITNESS WHEREOF, the parties hereto have executed this
                  Agreement on the day and year first above written.
                </p>
                <p>
                  LICENSOR LICENSEE  An Authorized Signatory
                  {contract?.artist_name} An Authorized Signatory
                  CREATE MUSIC GROUP, INC. Name: 1 Name: 2 Date: d1 Date: d2
                </p>
                <h6>
                  Schedule A Licensor’s owned catalog of visual, audio, and
                  audiovisual assets.
                </h6>
                <table style={{ border: "1px solid black" }}>
                  <thead>
                    <tr>
                    <th style={{ border: "1px solid black" }}>ISRC</th>
                    <th style={{ border: "1px solid black" }}>Title</th>
                    <th style={{ border: "1px solid black" }}>Stream Income Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {docxData.map((item, index) => (
                      <tr key={item}>
                        <td style={{ border: "1px solid black" }}>{item.isrc}</td>
                        <td style={{ border: "1px solid black" }}>{item.title}</td>
                        <td style={{ border: "1px solid black" }}>{item.stream_income_share}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3>EXHIBIT A – CONTENT CLAIMING SERVICES</h3>
                <p>
                  1. Definitions. 1. ‘Claiming Net Revenue’ – gross revenue
                  actually received by Licensee from Content Claiming (as
                  defined herein), less Licensee’s out-of-pocket collection and
                  third-party transaction processing costs (e.g. wire, PayPal,
                  or currency conversion costs). 1. ‘Content’ – any audio,
                  visual, and/or audiovisual media (including without
                  limitation, motion pictures, photographs and videos [including
                  those posted by third parties], and all associated meta¬data
                  including the names, likenesses, trademarks and trade names in
                  all such media and metadata), which is solely owned or
                  controlled by Licensor and any and all Content owned or
                  controlled by Licensor during the Term including, without
                  limitation, the Master Recordings. Either party may submit
                  potential Content for approval to the other party. Such
                  approval may be given by email to the applicable email address
                  set forth in the notice provision hereunder. 1. ‘Media’ – the
                  platforms upon which the Content is uploaded and monetized
                  including but not limited to Content that has been uploaded to
                  YouTube, Facebook, Soundcloud, YouTube Premium, YouTube Music
                  and other social media platforms. 1. ‘Unauthorized Content’ –
                  any content taken or reproduced (in whole or in part) from any
                  Content that has been uploaded on Media without the consent of
                  authorization of Licensor. 1. ‘YouTube’ – all consumer facing
                  third party digital websites, URL’s, domains, and applications
                  whether accessible from the internet, mobile or wireless
                  networks, via computer, mobile device, console or otherwise,
                  that display and/or contain YouTube videos and/or embeds,
                  including but not limited to Facebook, MySpace, Snapchat, and
                  any other website and/or social media platform which contains
                  YouTube hosted and/or embedded videos. For the avoidance of
                  doubt, all capitalized terms used herein shall be accorded the
                  same meaning as in the Agreement unless otherwise provided in
                  this Exhibit A.
                </p>
                <p>
                  2. Content Claiming Rights Granted. (a) During the Term and
                  within the Territory, Licensor hereby grants Licensee the
                  exclusive right (via the Media) to: (i) monitor the Media for
                  the reproduction, distribution, public performance, public
                  display, and synchronization of the Content with user-uploaded
                  videos and monetize and/or claim the Content; (ii) collect any
                  and all monies derived from such monetization and/or claiming;
                  (iii) block, disable, and/or takedown Unauthorized Content;
                  (iv) access and utilize Licensor’s manager accounts in
                  connection with the Media hereunder; (v) create, on behalf of
                  Licensor, art tracks using the Content hereunder (including,
                  where applicable, lyrics) (‘Art Tracks’), and as between the
                  parties Licensor shall own all right, title and interest in
                  and to such Art Tracks; and (vi) send DMCA take¬down notices
                  to Media channels distributing videos containing links to
                  unauthorized downloads of the Content (collectively, such
                  activities are ‘Content Claiming’). (b) Licensor grants
                  Licensee the right to use Licensor’s name, image, voice,
                  signature, biography, and likeness in and in connection with
                  the exploitation of Licensor’s Content. Licensor grants to
                  Licensee the right to change the duration, transcode, resize
                  and reformat the Content insofar as necessary to repurpose,
                  watermark, and/or fingerprint the Content for monitoring on
                  YouTube in accordance with the purpose of this license. In
                  connection with the Art Tracks, all album artwork, cover art
                  and any other materials utilized in connection with the
                  Content in the Media by Licensor (e.g. album art contained on
                  SoundCloud) is hereby approved for Licensee’s use in
                  connection with the Art Tracks. Licensor may deliver to
                  Licensee an alternative visual image or images to use in
                  connection with the Art Tracks, subject to Licensee’s
                  reasonable approval in each instance. In the event Licensee
                  selects an alternative visual image or images not provided to
                  Licensee by Licensor, such images will be subject to
                  Licensor’s approval, not to be unreasonably withheld or
                  delayed. In the event Licensor does not approve of Licensee’s
                  alternative visual image(s), Licensor will use reasonable
                  efforts to provide Licensee with comparable replacement
                  images.
                </p>
                <p>
                  3. Licensor’s Content Claiming Obligations. During the Term,
                  Licensor shall: (a) Deliver the Content in a format,
                  resolution, and bitrate as is customary to Licensee or as
                  otherwise designated by the delivery method specified or
                  agreed to by Licensee. Licensee may modify the required
                  delivery formats and/or destination address at any time upon
                  reasonable notice to Licensor. Any sound recordings or musical
                  compositions embodied on the Content must be delivered with
                  the song title, and Licensor’s name; (b) Take all such actions
                  as may be required by Licensee or Media (including without
                  limitation giving email or other notice to Media) in order to
                  enable Licensee to claim the Content in the manner described
                  herein including, without limitation, delivering reference
                  files for the Content to enable Licensee to conduct the
                  Content Claiming services herein. (c) Provide Licensee with
                  written notice of any Media channel to be ‘white¬listed.’ (d)
                  Partner any and all associated YouTube channels and SoundCloud
                  profiles and allow Licensee full administrative rights:
                  including viewing revenue, receiving and paying out revenue,
                  and monetizing uploads (e) Cooperate with Licensee’s requests
                  in order to finalize channel partnerships (f) Set forth any
                  and all Territory restrictions for each individual piece of
                  Content in the metadata related to that Content, and
                  subsequently update such metadata from time to time. (g)
                  Provide Licensee with all applicable logins (i.e.,
                  password/login name, email, etc.) to the manager accounts
                  associated with the Media, and such logins shall be treated as
                  Confidential Information in accordance with paragraph 11 of
                  the Agreement.
                </p>
                <p>
                  4. Content Claiming Royalty. Licensee shall pay Licensor,
                  conditioned upon Licensor’s satisfaction of all covenants and
                  conditions contained herein, 70% of the Claiming Net Revenue
                  actually received by the Licensee in connection with Content
                  Claiming of Licensor’s Content (the ‘Content Claiming
                  Royalty’). Licensee shall pay Licensor, conditioned upon
                  Licensor’s satisfaction of all covenants and conditions
                  contained herein, 90% of the Net Revenue actually received by
                  the Licensee in connection with Licensor’s SoundCloud Content
                  (the ‘SoundCloud Royalty’). The Content Claiming Royalty and
                  SoundCloud Royalty shall be payable to Licensor in accordance
                  with the terms of paragraph 5 of the Agreement.
                </p>
                <p>
                  5. Content Claiming Representations and Warranties. Licensor
                  hereby warrants and represents that: (a) Licensor has obtained
                  all necessary clearances with respect to all third-party
                  materials used in the Content and/or Art Tracks (including
                  without limitation, all musical compositions, performances,
                  samples, names and likenesses) and, if applicable, shall be
                  solely responsible for paying any royalties due to third
                  parties, including performing rights societies, in connection
                  with the use, performance, or other exploitation of the
                  Content, and Licensor is not aware of any third-party claim
                  that has been made or threatened with respect to the Content.
                  Upon request, Licensor shall provide copies of such clearance
                  paperwork; (b) Licensor’s has or will at its own expense
                  obtain and, to the extent required, pay for all necessary
                  performing rights from the copyright owners of the Content and
                  such other persons, firms or associations, societies or
                  corporations as may own or control the performing rights
                  thereto; (c) Licensor’s Content does not and shall not: (a)
                  infringe on the proprietary or intellectual property rights of
                  any third party, including, without limitation, copyrights,
                  trademark rights and rights of publicity and privacy or (b)
                  violate any applicable laws (including without limitation the
                  laws and regulations governing export control, unfair
                  competition, antidiscrimination or false advertising); (d)
                  Licensor owns or controls, and shall own and control, the
                  rights necessary to grants the rights, licenses and
                  permissions granted to Licensee hereunder to allow Licensee to
                  freely exploit the Content and rights granted to Licensee
                  herein to effect the purpose of the Exhibit A, without the
                  need for any licenses, releases, consents, approvals not
                  granted herein or the requirement to make any payments of any
                  nature to any person (excluding solely the obligation to pay
                  royalties to Licensor in the manner described herein); and (e)
                  Licensor has or will at its own expense obtain and, to the
                  extent required, pay for all necessary performing rights from
                  the copyright owners of the Content and such other persons,
                  firms or associations, societies or corporations as may own or
                  control the performing rights thereto.
                </p>
                <p>
                  6. Exclusivity. If at any time Licensor engages any other
                  person or entity to perform the Content Claiming services,
                  then, without limiting Licensee’s rights, Licensee shall have
                  the right, exercisable at any time by written notice to
                  Licensor (email shall suffice), to extend the Term of the
                  Agreement as it relates to Licensee’s Content Claiming Rights
                  pursuant to this Exhibit A. Such extension shall continue
                  until Licensor has fully cured such engagement or terminated
                  any engagement which is in violation of this Exhibit A, and
                  the Term of the Agreement as it relates to Licensee’s Content
                  Claiming Rights pursuant to this Exhibit A shall be extended
                  for a period of time equal to the duration of any such
                  engagement. Licensor acknowledges that Licensee’s exercise of
                  its rights hereunder shall not in any way affect or diminish
                  its right to seek equitable relief hereunder.
                </p>
                <h3>EXHIBIT B – CHANNEL PARTNERSHIP SERVICES</h3>
                <p>
                  1. Channel Partnership Services. During the Term, Licensee
                  will provide Licensor with the following services: (a) Grant
                  access to any content libraries that Licensee makes available
                  generally to its content providers such as Licensor for use in
                  Your Videos; (b) Consider Licensor’s Content for: (i) the sale
                  of Direct Ads; (ii) the sale of Branded Entertainment
                  Arrangements; and for Other Platform opportunities, if
                  applicable; (iii) distribution on one or more Create Music
                  Group Channels (such distribution, if any, shall be subject to
                  Licensor’s prior written approval); and (c) Provide, in Create
                  Music Group’s sole discretion, either by Create Music Group or
                  by one or more of its Affiliates, other value-added benefits
                  or services that may be typically offered to content providers
                  such as You under Create Music Group’s content provider
                  agreements, which may include graphic design, content
                  production, channel management, and content strategy sessions.
                </p>
                <p>
                  2. Channel Partnership Grant of Rights. During the Term,
                  Licensor grants to Licensee the following transferable, sub
                  licensable, royalty-free rights (but not obligations) in the
                  Territory: (a) The exclusive right (other than the independent
                  rights, if any, of Your Platforms to sell Ads) to sell and
                  represent any and all Ad inventory in relation to Your Content
                  and Claimed Content on Your YouTube Channels; (b) The
                  exclusive right (as between Create Music Group and any other
                  third party, but not excluding You) to sell and represent Your
                  Content and Claimed Content on Your YouTube Channels for the
                  purposes of securing Branded Entertainment Arrangements,
                  subject to Your written approval in each instance, such
                  approval not to be unreasonably withheld or delayed; (c) The
                  non-exclusive right to use or deal with Your ID (including to
                  undertake all activities referred to in Section 4(c) to
                  promote Your Content and Claimed Content, the Create Music
                  Group Network, and any brand owned (in whole or in part),
                  licensed or operated (in whole or in part) by Create Music
                  Group, its Affiliates or its sub-licensees from time to time;
                  (d) The exclusive right to display, exhibit, perform (publicly
                  or otherwise), distribute, advertise, promote, publish,
                  transmit, translate, stream, broadcast, adapt, modify, prepare
                  derivative works based on, synchronize (in timed relation or
                  otherwise) compile, encode, host, cache, route, index, store,
                  copy, reproduce, reformat, excerpt, analyze, create algorithms
                  and ID Files based on, and otherwise use, exploit, or deal
                  with Your Content or Claimed Content on YouTube or in
                  connection with Create Music Group’s Services or Create Music
                  Group’s business on YouTube, including to display Create Music
                  Group’s and any of its sub-licensee’s promotional material on
                  or in connection with Your Content and Claimed Content, and to
                  associate Your Content and Claimed Content with any brand
                  owned (in whole or in part), licensed, or operated by Create
                  Music Group, its Affiliates, or its sub-licensees from time to
                  time; and (e) The non-exclusive right to otherwise use Your
                  Content and Claimed Content to perform all obligations, and
                  exercise all rights, of Create Music Group as set out in this
                  Exhibit B.
                </p>
                <p>
                  3. Channel Partnership Royalties. In connection with the
                  Channel Partnership Services, Licensee shall pay to Licensor
                  (Licensor’s percentages of Net Revenue as provided in
                  paragraphs 3(a)-3(f) below are collectively referred to as the
                  ‘Channel Partnership Royalties’): 1. 80% of Google Ad Net
                  Revenue received by Create Music Group from Your Videos on
                  Your YouTube Channels and Create Music Group Channels; 1. If
                  any Direct Ads are sold (in addition to the Google Ads sold),
                  an amount equal to 50% of Direct Ad Net Revenue received by
                  Create Music Group from Your Videos on Your YouTube Channels
                  or on a Create Music Group Channel; provided, however, in the
                  event You provide a notice of termination but Create Music
                  Group has secured or secures a signed insertion order (‘IO’)
                  related to any Direct Ad campaigns (targeting your YouTube
                  Channel) following a notice of termination but prior to the
                  termination of the Agreement, the Agreement shall continue in
                  full force and effect as to such Direct Ads until the
                  completion date of the applicable Direct Ad campaign as set
                  forth in the applicable IO. (c) (i) Sixty percent (60%) of all
                  Branded Entertainment Net Revenue received by Create Music
                  Group from Branded Entertainment Arrangements secured by
                  Create Music Group; (ii) Sixty percent (60%) of all Branded
                  Entertainment Net Revenue received by Create Music Group from
                  Branded Entertainment Arrangements secured by You, but
                  administered or managed by Create Music Group; (d) 80% of
                  Music Subscription Service Net Revenue received by Create
                  Music Group from Your Content being distributed on or through
                  the Music Subscription Service; (e) 80% of AudioSwap Library
                  Net Revenue received by Create Music Group from the use and/or
                  inclusion of AudioSwap Recordings in User Content. See the
                  YouTube AudioSwap Terms and Conditions. (f) The Channel
                  Partnership Royalties shall be payable to Licensor in
                  accordance with the terms of paragraph 5 of the Agreement. In
                  addition to the amounts set forth above, Licensee shall also
                  pay Licensor a portion of any other revenue received by
                  Licensee in connection with this Agreement (i.e., off-You-Tube
                  revenue), as mutually agreed in writing (email shall suffice)
                  by the parties on a case-by-case basis. (g) Notwithstanding
                  anything to the contrary contained in this Exhibit B, Create
                  Music Group shall not be liable for, and may charge back to
                  You, any payment based on: (i) any amounts which arise or
                  result from any of the prohibited conduct set out in Section 3
                  above; (ii) Action Fraud, regardless of whether condoned or
                  initiated by You; (iii) Ads delivered to End Users whose
                  browsers have JavaScript disabled; and (iv) Ads created or
                  produced for Create Music Group or the Platform on which the
                  Ad appears for their own products and/or services. Create
                  Music Group reserves the right to withhold payment otherwise
                  due to You pending Create Music Group’s reasonable
                  investigation of any activity referred to in this Section 5(f)
                  or of any breach or suspected breach of this Agreement by You.
                  You agree to cooperate with Create Music Group in its
                  investigation of any of the foregoing.
                </p>
                <p>
                  4. Licensor’s Channel Partnership Obligations. During the
                  Term, Licensor will: 1. Promptly take all such action as may
                  be required by Create Music Group in order to permit: (i) Your
                  Content to be included in Create Music Group’s CMS; and (ii)
                  the views of Your Content and Claimed Content to be included
                  or “rolled up” exclusively into Create Music Group’s views,
                  impressions, and other reporting metrics; 1. Create or acquire
                  Your Videos on a frequency and at a level of quality
                  consistent with Your Content uploaded to Your YouTube Channels
                  prior to the Effective Date, and promptly upload them to Your
                  YouTube Channels; 1. Maintain and manage the development of
                  Your YouTube Channels; and 1. For the purposes of Create Music
                  Group Claiming Your Videos on YouTube, provide to Create Music
                  Group upon Create Music Group’s request metadata for Your
                  Videos not uploaded onto Your YouTube Channels in a form
                  acceptable to Create Music Group. 1. Comply with all: (i)
                  policies and procedures of Create Music Group as may be in
                  effect from time to time, including Create Music Group’s Terms
                  of Service displayed on Create Music Group’s websites, and
                  Create Music Group’s Privacy Policy displayed on Create Music
                  Group’s websites (“Create Music Group’s Privacy Policy”), all
                  of which are incorporated herein by this reference, and if you
                  are an individual, Create Music Group may collect, use and
                  disclose certain personal information from and about you in
                  accordance with Create Music Group’s Privacy Policy; (ii)
                  applicable policies, procedures, or End User agreements and
                  privacy policies of Your Platforms (each a “Content
                  Guideline”); and (iii) applicable laws, rules, and
                  regulations. ; 1. Not, and will not authorize any third party
                  to, distribute any content or attempt to monetize any content
                  that infringes on the rights of others or violates any Content
                  Guidelines; and 1. Not, and will not authorize or encourage
                  any third party to, directly or indirectly generate queries,
                  impressions of or clicks on any Ad(s) or to obtain access to
                  Your Content through: (A) any automated, deceptive, fraudulent
                  or other invalid means, including through repeated manual
                  clicks, the use of robots or other automated query tools
                  and/or computer generated search requests, or the fraudulent
                  use of other search engine optimization services and/or
                  software; (B) clicks or impressions originating from Your IP
                  address or Your computers; (C) the payment of money, false
                  representation or requests for users to click on Ads; or (D)
                  any other means designed to imitate a legitimate End User or
                  otherwise skew results (collectively, “Action Fraud”).
                </p>
                <p>
                  5. Intellectual Property & Feedback. (a) Unless the parties
                  agree otherwise in writing, the parties acknowledge and agree
                  that any proprietary intellectual property and rights,
                  including any copyrights, trademarks, service marks, trade
                  names, monikers, trade dress, patents or other intellectual
                  property, that has been or will be provided by either party to
                  the other party hereunder will remain the sole and exclusive
                  property of the providing party. In particular, as between You
                  and Create Music Group, Create Music Group retains all right,
                  title, and interest in and to Create Music Group’s services
                  and the proprietary technology, websites, software, products,
                  services, processes, information, or materials used in the
                  provision of such services (collectively, ‘Create Music Group
                  Property’). Nothing herein shall be construed to restrict,
                  impair, encumber, alter, deprive, or adversely affect Create
                  Music Group Property or any of Create Music Group’s rights or
                  interests therein or any other Create Music Group intellectual
                  property, brands, information, content, processes,
                  methodologies, products, goods, services, materials, or
                  rights, tangible or intangible. All rights, title, and
                  interest in and to Create Music Group Property that are not
                  expressly granted in this Agreement are reserved by Create
                  Music Group. (b) You may from time to time provide
                  suggestions, comments or other feedback to Create Music Group
                  with respect to Create Music Group’s Services (‘Feedback’).
                  Feedback, even if designated as confidential by You, shall not
                  create any confidentiality obligation for Create Music Group
                  notwithstanding anything else. You shall, and hereby do grant
                  Create Music Group a non-exclusive, worldwide, perpetual,
                  irrevocable, transferable, sub-licensable, royalty-free,
                  fully-paid-up license to use the Feedback for any purpose.
                </p>
                <p>
                  6. Definitions. (a) ‘Ad’ – an advertisement: (i) served with,
                  in, on or in relation to Your Videos or Your YouTube Channels,
                  including pre-roll, in-stream, post-roll, overlay and
                  synchronized banner advertisements that have been sold
                  specifically against Your Videos or Your YouTube Channels (as
                  opposed to, for example, banner advertisements and advertising
                  inventory appearing on Platforms or Channels, other than Your
                  YouTube Channels, that are not directly and specifically sold
                  against Your Videos or Your YouTube Channels); and (ii) the
                  revenue generated from which can be tracked and directly tied
                  to Your Videos or Your YouTube Channels. For the avoidance of
                  doubt, Ads exclude Branded Entertainment Arrangements. (b)
                  ‘Affiliate’ – any other person that directly or indirectly
                  controls, is controlled by, or is under common control with
                  such person, except that for purposes of this Agreement. For
                  purposes of this definition, a person ‘controls’ another
                  person if such person possesses, directly or indirectly, the
                  power to direct the management and policies of that other
                  person, whether through ownership of voting securities, by
                  contract or otherwise and ‘controlled by’ and ‘under common
                  control with’ have similar meanings. (c) ‘Allowable Costs’ –
                  in connection with a Branded Entertainment Arrangement, all
                  costs incurred by Create Music Group or an Affiliate of Create
                  Music Group, or both, in the production of Your Video that is
                  subject to such Branded Entertainment Arrangement, up to such
                  maximum amount as may be agreed to by You and Create Music
                  Group. (d) ‘Create Music Group Channels’ – all Channels owned
                  or controlled by Create Music Group or any of its Affiliates,
                  in whole or in part, but does not include Your YouTube
                  Channels or any other Channels in the Create Music Group
                  Network under Content Provider Agreements between Create Music
                  Group or an Affiliate of Create Music Group and Providers such
                  as You. (e) ‘Create Music Group Network’ – all Channels under
                  Content Provider Agreements between Create Music Group or an
                  Affiliate of Create Music Group and Providers such as You, and
                  all Channels and Platforms owned or controlled by Create Music
                  Group, in whole or in part, or through which Create Music
                  Group distributes content, including the Create Music Group
                  Channels. (f) ‘Create Music Group Platform’ – a Platform owned
                  or controlled by Create Music Group or an Affiliate of Create
                  Music Group, in whole or in part. (g) ‘Branded Entertainment
                  Arrangement’ – an arrangement pursuant to which: (i) Your
                  Video includes the appearance of a branded product or service
                  within the video itself and within the context of the
                  subject-matter of the video for the purposes of the promotion
                  of such product or service, including product placements; or
                  (ii) Your Video contains or is accompanied by a notification
                  to the effect that Your Video has been sponsored or otherwise
                  supported by, or a promotional consideration has been made by,
                  a specified brand or third party; where You, Create Music
                  Group and/or an Affiliate of Create Music Group has received,
                  or is entitled to receive, consideration from the owner or
                  promoter of such brand or third party in return for such
                  appearance. (h) ‘Branded Entertainment Net Revenue’ – the
                  revenue actually received by Create Music Group pursuant to a
                  Branded Entertainment Arrangement, less the following amounts
                  charged, levied, paid or payable in relation to such revenue:
                  (i) taxes (other than net income taxes) and other government
                  levies; (ii) Allowable Costs, if any; and (iii) the Rights
                  Fee, if any. (i) ‘Channel’ – an online, wireless, broadcast or
                  digital medium, whether now known or hereafter created or
                  devised, on which Video Content is distributed or displayed.
                  For greater certainty, ‘Channel’ includes TV channels;
                  channels accessible via Video Content websites such as
                  YouTube; channels accessible via software applications such as
                  mobile applications, desktop applications, and web-based
                  applications; and websites that You own or control that
                  distribute or display Your Videos. A Channel may also be a
                  Platform. (j) ‘CMS’ – Create Music Group’s content management
                  system with Google, in the case of YouTube content management,
                  and in the case of other Platforms, with the owner or operator
                  of such Platform. (k) ‘Controls’ – in relation to a Channel,
                  the right of a person or entity who is not the owner or
                  operator of the Platform that such Channel is within, to
                  distribute Video Content on such Channel to the exclusion of
                  all third parties, or all third parties other than such
                  Platform owner or operator. (l) ‘Direct Ad’ – an Ad sold by,
                  or with the consent or authorization of, Create Music Group
                  (other than Google Ads). (m) ‘Direct Ad Net Revenue’ – the
                  revenue earned and actually received by Create Music Group or
                  Affiliate of Create Music Group, whichever is the seller, in
                  such period from Direct Ads, less the following amounts
                  charged, levied, paid or payable by Create Music Group or such
                  Affiliate in relation to such revenue: (i) 5% of such revenue
                  as a commission retained by Create Music Group or such
                  Affiliate; (ii) applicable advertising-related rebates and
                  commissions (including commissions due to employees or
                  consultants of Create Music Group or such Affiliate) and cost
                  of inventory, if any; (iii) amounts due to advertising
                  providers, if any; (iv) taxes (other than net income taxes)
                  and other government levies; (v) the Google Fee, if any (to
                  the extent not deducted prior to Create Music Group’s or such
                  Affiliate’s receipt of such revenue); and (vi) the Rights Fee,
                  if any. (n) ‘End User’ – person(s) accessing Your Videos via a
                  Platform, or via a Channel within a Platform. (o) ‘Effective
                  Date’ of this Agreement means the date Create Music Group
                  sends an email or other electronic communication to You to the
                  effect that You have been partnered with Create Music Group or
                  otherwise acknowledging that You have joined a Create Music
                  Group Network, unless Create Music Group specifies another
                  date as being the Effective Date in such email or other
                  electronic communication or in an accompanying email or other
                  electronic communication, in which case the Effective Date
                  shall be the date so specified. (p) ‘Google’ means Google Inc.
                  or any of its Affiliates, including YouTube LLC, or their
                  successors or assigns. (q) ‘Google Ad’ means an Ad sold by
                  Google with respect to Your Videos or Your YouTube Channels.
                  (r) ‘Google Ad Net Revenue’ for any period means the revenue
                  earned and actually received by Create Music Group in such
                  period from Google Ads with respect to Your Content on
                  YouTube, less the following amounts charged, levied, paid or
                  payable in relation to such revenue: (a) taxes (other than net
                  income taxes) and other government levies; (b) the Google Fee,
                  if any (to the extent not deducted prior to Create Music
                  Group’s receipt of such revenue); and (c) the Rights Fee, if
                  any. (s) ‘Google Fee’ means any amount charged by Google, in
                  the case of YouTube, or in the case of any Other Platform,
                  charged by the owner or operator thereof, in relation to the
                  monetization of all or any part of Your Content. (t) ‘ID File’
                  means the unique binary data that describes Your Content, and
                  which is used for the automatic identification of that
                  content. (u) ‘Other Net Revenue’ – the revenue earned and
                  actually received by Create Music Group in such period from
                  the distribution, monetization, and/or exploitation of Your
                  Content in a manner other than: (i) through the sale of Google
                  Ads, Direct Ads, or Branded Entertainment Arrangements, (ii)
                  from the Music Subscription Service (as defined in Exhibit C
                  herein), or (iii) from the use and/or inclusion of AudioSwap
                  Recordings (as defined in Exhibit D herein) in User Content,
                  if any, but includes revenue earned and actually received by
                  Create Music Group in connection with Your Content from
                  rentals, in-app purchases, and download-to-own methods of
                  monetization, less the following amounts charged, levied, paid
                  or payable in relation to such revenue: (i) taxes (other than
                  net income taxes) and other government levies; (ii) applicable
                  advertising-related rebates and commissions (including
                  commissions due to employees or consultants of Create Music
                  Group) and cost of inventory, if any; (iii) amounts due to
                  advertising providers, if any; (iv) the Google Fee, if any (to
                  the extent not deducted prior to Create Music Group’s receipt
                  of such revenue); (v) the Rights Fee, if any; and (vi) amounts
                  due to Create Music Group’s content aggregators, if any. (v)
                  ‘Other Platform’ means a Platform other than YouTube. (w)
                  ‘Platform’ means a technology, service, product, tool,
                  interface, vehicle or system, whether now known or hereafter
                  created or devised, on which one or more Channels or Video
                  Content are hosted, powered, operated, managed, accessed,
                  displayed, distributed, or viewed. For greater certainty,
                  ‘Platform’ includes websites such as YouTube and Facebook, and
                  other third party websites that are not owned or controlled by
                  You; software applications such as mobile applications,
                  desktop applications, and web-based applications; television;
                  radio; film; videotape or audiotape; CD’s; and DVD’s; but any
                  Channels within a Platform, such as YouTube Channels within
                  the YouTube Platform or Facebook pages within the Facebook
                  Platform, are not themselves separate Platforms but instead
                  form part of the Platform they are on or within. A Platform
                  that does not have separate Channels is also a Channel. (x)
                  ‘Reference Files’ means digital files of Your Content. (y)
                  ‘Rights Fee’ means amounts due to third party rights holders,
                  if any, for the use or distribution of such third party’s
                  sound recordings, compositions, logos, trademarks, or other
                  audio, visual or audio-visual elements or rights, where the
                  right to use such elements or rights was provided to You by or
                  through Create Music Group. (z) ‘User Content’ means copies of
                  Your Content or any element or part thereof, which are posted
                  on a Platform from time to time by users of such Platform
                  other than You or Create Music Group, without prior authority
                  from You or Create Music Group to do so. (aa) ‘Video Content’
                  means any audio, visual or audio-visual media content. (bb)
                  ‘YouTube’ means the internet video-sharing website known as
                  ‘YouTube’ on which users can upload, share and view videos, at
                  www.youtube.com, including all mirror and derivative sites,
                  and any and all other localized or international versions of
                  such website, and includes any successor or replacement
                  thereof. (cc) ‘YouTube Channel’ means a Channel on or within
                  YouTube. (dd) ‘Your ID’ means Your name, likeness, trademarks,
                  brands, logos, trade names and any other monikers, trade dress
                  or the like identifying You or Your Content. (ee) ‘Your
                  Platforms’ means the Platforms on which Your Videos are
                  displayed, exhibited, performed, distributed, published,
                  transmitted, streamed or broadcasted. (ff) ‘Your Content’
                  means Your YouTube Channels and Your Videos, and includes the
                  following contained within or related to Your YouTube Channels
                  and Your Videos: (i) graphics, music, sounds, images, files,
                  photos, animation, artwork, text, data, information, messages,
                  hypertext, links, script, or other materials; and (ii) all
                  metadata; and for greater certainty, Your Content includes
                  Your ID, but only to the extent Your ID is contained in Your
                  Videos. You represent that Your YouTube Channels are as
                  follows: YouTube Account link will be provided. (No payments
                  will be made until link is provided and partnership accepted.)
                  (gg) ‘Your Revenue’ means the amounts owing to You in
                  accordance with this Exhibit B. . (hh) ‘Your Videos’ means
                  audio, visual and audio-visual content which You own, control,
                  license, or to which You otherwise claim rights, during the
                  Term of this Agreement, including all such content appearing
                  on Your YouTube Channels, but excludes any such content which
                  is specifically subject to a separate Content Provider
                  Agreement between You and Create Music Group, whether entered
                  into before or after the Effective Date. (ii) ‘Your YouTube
                  Channels’ means YouTube Channels which You own, control,
                  license, or to which You otherwise claim rights, during the
                  Term of this Agreement, but excludes any such YouTube Channels
                  which are specifically subject to a separate Content Provider
                  Agreement between You and Create Music Group, whether entered
                  into before or after the Effective Date. For the avoidance of
                  doubt, at any time during the Term Term , the Parties may
                  confirm in writing (e.g. via email) the identity of all
                  YouTube Channels added to the scope of this Agreement after
                  the Effective Date (such YouTube Channels would be deemed Your
                  YouTube Channels).
                </p>
                <h3>
                  EXHIBIT B-1 – YOUTUBE MUSIC SUBSCRIPTION SERVICE TERMS AND
                  CONDITIONS
                </h3>
                <p>
                  1. Definitions. In addition to terms defined elsewhere in this
                  Agreement, the terms below are defined as follows: 1.
                  ‘Artwork’ means album artwork, cover art, other artist images
                  and any associated materials related to Your Content provided
                  to Create Music Group, or Google as Create Music Group’s
                  sublicensee, under this Agreement. 1. ‘Art Track’ means a
                  complete master sound recording that is played back to an End
                  User with an accompanying image(s) that is, in each case,
                  designated by the applicable record label (or by Google on
                  such record label’s behalf) using tools, including
                  auto-generation tools, provided by Google. 1. ‘Audio Match’
                  means any third-party audio determined by the System to match
                  an ID File. 1. ‘Music Subscription Service’ means the content
                  streaming service made available to End Users on or through
                  YouTube through paid subscriptions or other eligibility
                  requirements as determined by Google from time to time. 1.
                  ‘Music Subscription Service Net Revenue’ for any period means
                  the revenue earned and actually received by Create Music Group
                  in such period from the distribution of Your Content on or
                  through Music Subscription Service, less the following amounts
                  charged, levied, paid or payable in relation to such revenue:
                  (a) taxes (other than net income taxes) and other government
                  levies; (b) applicable advertising-related rebates and
                  commissions (including commissions due to employees or
                  consultants of Create Music Group), if any; (c) amounts due to
                  advertising providers, if any; (d) the Google Fee, if any (to
                  the extent not deducted prior to Create Music Group’s receipt
                  of such revenue); (e) the Rights Fee, if any; and (f) amounts
                  due to Create Music Group’s content aggregators, if any. 1.
                  ‘Music Search Service’ means the Google owned, controlled or
                  branded music recognition and identification service which, at
                  the request of an End User, utilizes Audio Matching to
                  identify Your Content. 1. ‘System’ means certain tools and
                  systems provided by Google intended to assist Create Music
                  Group and/or You in the identification and management of
                  audio, visual, and audio-visual works on YouTube and that
                  enable Create Music Group and/or You to set usage policies for
                  such works. 1. ‘Your Art Tracks’ means an Art Track that is
                  embedded with a complete Your Sound Recording. 1. ‘Your Sound
                  Recordings’ means Your Videos which consist of: (a) master
                  sound recordings embodying a musical composition (or ID Files
                  generated therefrom) delivered to Create Music Group or
                  Google, as Create Music Group’s sublicensee; (b) all sound
                  recordings embedded within User Content on YouTube which match
                  to such master sound recordings using the System; and (c) all
                  sound recordings owned or controlled by You (embodying musical
                  compositions), which are embedded within User Content that
                  Create Music Group or You Claim using the System. For the
                  avoidance of doubt, sound recordings embodied in Your Videos
                  will be deemed to be part of Your Video, not Your Sound
                  Recording.
                </p>
                <p>
                  2. Music Subscription Service License. For the avoidance of
                  doubt, the Parties hereby recognize that, pursuant to Section
                  4(c) of the General Terms and Conditions in Exhibit B of this
                  Agreement, You grant to Create Music Group, and Google as
                  Create Music Group’s sublicensee, all the rights set forth in
                  the aforementioned Section for the distribution of Your
                  Content, and all sound recordings and compositions embodied
                  therein, on or through the Music Subscription Service in the
                  Territory.
                </p>
                <p>
                  3. Art Track Creation and Ownership. You hereby authorize
                  Create Music Group, and Google as Create Music Group’s
                  sublicensee, to create, on Your behalf, Your Art Tracks using
                  Your Sound Recordings and other content (including lyrics). As
                  between the Parties, You will own all right, title and
                  interest in and to the Art Tracks (excluding any third party
                  content independently included by Create Music Group, or
                  Google as Create Music Group’s sublicensee, in Your Art
                  Tracks), which are hereby licensed to Create Music Group, and
                  Google as Create Music Group‘s sublicensee, on an exclusive
                  basis. Following the expiration or termination of the Term,
                  Create Music Group’s sole obligation with respect to the Art
                  Tracks will be to cease distribution thereof; Create Music
                  Group will not be required to deliver any of Your Art Track
                  files or metadata to You. You will have no right to license or
                  distribute Your Art Tracks to any third parties during the
                  Term or following the expiration or termination of the Term.
                  Further, You are not granted the right to claim User Content
                  with Your Sound Recordings as Your Art Tracks hereunder. All
                  Artwork and any other materials provided to Create Music
                  Group, or Google as Create Music Group’s sublicensee, by You
                  is hereby approved for use in connection with Your Art Tracks.
                  If Create Music Group, or Google as Create Music Group’s
                  sublicensee, selects alternative visual image(s) not provided
                  to Create Music Group, or Google as Create Music Group’s
                  sublicensee, by You to use in connection with Art Track(s),
                  such image(s) will be subject to Your approval, not to be
                  unreasonably withheld or delayed. If You do not approve Create
                  Music Group’s or Google’s (as Create Music Group’s
                  sublicensee) alternative visual image(s), You will use
                  reasonable efforts to provide Create Music Group, or Google as
                  Create Music Group’s sublicensee, with comparable replacement
                  images.
                </p>
                <p>
                  4. Artwork License. You hereby grant to Create Music Group,
                  and Google as Create Music Group’s sublicensee, a limited,
                  non-exclusive, worldwide, royalty-free license to use Your
                  Artwork for use in connection with the license granted under
                  Section 2 of this Exhibit C. You will deliver Your Artwork to
                  Create Music Group, or Google as Create Music Group’s
                  sublicensee, in accordance with Create Music Group’s or
                  Google’s then- current specifications. As between Create Music
                  Group and You, all use by Create Music Group, or Google as
                  Create Music Group’s sublicensee, of Your Artwork (including
                  any goodwill associated therewith) will inure to Your benefit.
                </p>
                <p>
                  5. Audio Matching License. You hereby grant to Create Music
                  Group, and Google as Create Music Group’s sublicensee, a
                  limited, non-exclusive, worldwide, royalty-free license to use
                  Your Reference Files and ID Files for Audio Matching in
                  connection with the Music Search Service. At the request of
                  End Users utilizing the Music Search Service, the System will
                  compare ambient audio to the ID Files corresponding to Your
                  References Files to identify Your Content contemporaneously
                  with the ambient performance of such content. If the System
                  detects an Audio Match, Google may provide the End User with
                  an opportunity to purchase or listen to Your Content.
                </p>
                <h3>
                  EXHIBIT B-2 – YOUTUBE AUDIOSWAP LIBRARY TERMS AND CONDITIONS
                </h3>
                <p>
                  1. Definitions. In addition to terms defined elsewhere in this
                  Agreement, the terms below are defined as follows: 1.
                  ‘AudioSwap Library’ means the collection of sound recordings
                  licensed to Google and made available to End Users for use
                  with Google’s AudioSwap Tools. 1. ‘AudioSwap Library Net
                  Revenue’ for any period means the revenue earned and actually
                  received by Create Music Group in such period from the use
                  and/or inclusion of AudioSwap Recordings in User Content, less
                  the following amounts charged, levied, paid or payable in
                  relation to such revenue: (a) taxes (other than net income
                  taxes) and other government levies; (b) applicable
                  advertising-related rebates and commissions (including
                  commissions due to employees or consultants of Create Music
                  Group), if any; (c) amounts due to advertising providers, if
                  any; (d) the Google Fee, if any (to the extent not deducted
                  prior to Create Music Group’s receipt of such revenue); (e)
                  the Rights Fee, if any; and (f) amounts due to Create Music
                  Group’s content aggregators, if any. 1. ‘AudioSwap Recording’
                  means Your Sound Recordings (including the underlying
                  compositions contained therein) which You desire to make
                  available in the AudioSwap Library as communicated to Create
                  Music Group, or Google as Create Music Group’s sublicensee, by
                  You in writing (e.g. via email). 1. ‘AudioSwap Tools’ means
                  the tools made available by Google that allow End Users to
                  synchronize songs from the AudioSwap Library with User Content
                  upon the End User’s request, including Google’s video editing
                  tools. 1. ‘AudioSwap Video’ means User Content that has been
                  synchronized, in whole or in part, with an AudioSwap Recording
                  at the request and direction of an End User by means of the
                  AudioSwap Tools made available by Google. 1. ‘System’ (if not
                  already defined elsewhere in this Agreement) means certain
                  tools and systems provided by Google intended to assist Create
                  Music Group and/or You in the identification and management of
                  audio, visual, and audio-visual works on YouTube and that
                  enable Create Music Group and/or You to set usage policies for
                  such works. 1. ‘Your Sound Recordings’ (if not already defined
                  elsewhere in this Agreement) means: (a) master sound
                  recordings embodying a musical composition (or ID Files
                  generated therefrom) delivered to Create Music Group or
                  Google, as Create Music Group’s sublicensee, by You in digital
                  form in connection with this Agreement; (b) all sound
                  recordings embedded within User Content on YouTube which match
                  to such master sound recordings using the System; and (c) all
                  sound recordings owned or controlled by You (embodying musical
                  compositions), which are embedded within User Content that
                  Create Music Group or You Claim using the System. For the
                  avoidance of doubt, sound recordings embodied in Your Videos
                  will be deemed to be part of Your Video, not Your Sound
                  Recording.
                </p>
                <p>
                  2. AudioSwap License. Further to Section 4(c) of the General
                  Terms and Conditions in Exhibit B of this Agreement, You grant
                  to Create Music Group and Google as Create Music Group’s
                  sublicensee, all the rights set forth in the aforementioned
                  Section for the use and/or inclusion of AudioSwap Recordings
                  in User Content on a worldwide basis. Such grant of rights
                  includes the right to remix, edit, adapt, and create
                  derivative works based upon the AudioSwap Recordings solely to
                  the extent necessary to utilize the AudioSwap Tools. The right
                  to make AudioSwap Recordings available in the AudioSwap
                  library is limited to the Term of this Agreement, provided,
                  however, once an AudioSwap Recording is fixed within an
                  AudioSwap Video, the license with respect to such AudioSwap
                  Recording in such AudioSwap Video is irrevocable and will
                  apply in perpetuity (or for the full period of copyright
                  thereof) on a worldwide basis. AudioSwap Recordings will be
                  set to a default usage rule of ‘Monetize’, provided, in the
                  event of termination or expiration of the rights granted
                  herein, You will no longer have the ability to monetize such
                  AudioSwap Videos.
                </p>
                  </div> */}
            </Box>
          </Box>
          {/* <ContractHistory /> */}
          
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContractPreview;
