import { parse, render } from "ultrahtml";
import assert from "tiny-invariant";

/** Should roundtrip an accepted string */
export async function fuzz(data: Buffer) {
  let parsedNode;

  try {
    // try to parse the string
    parsedNode = parse(data.toString());
  } catch (e) {
    // catch a known error or:
    throw e;
  }

  assert(parsedNode, "parsedNode should not be undefined");
  // render that parsed node structure
  const renderedData = await render(parsedNode);

  assert(renderedData, "renderedData should not be undefined");
  assert(typeof renderedData === "string", "renderedData should be a string");

  // try to parse the the output of `render`
  const reparsedNode = parse(renderedData);

  assert(reparsedNode, "reparsedNode should not be undefined");
}
